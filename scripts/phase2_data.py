"""
VoiceText Analytics - Phase 2: dataset engineering
Standard library only (no installs needed).

Usage (from the project root):
    python scripts\\phase2_data.py inspect     -> docs/research/dataset_inventory.md
    python scripts\\phase2_data.py build       -> data/metadata/metadata.csv
                                                  data/splits/speaker_split_v1.json
                                                  docs/research/metadata_report.md

Rules followed: never invent labels, fill only fields that exist, split by SPEAKER.
"""
import csv
import json
import random
import sys
import wave
from collections import Counter, defaultdict
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "data" / "raw"
META_DIR = ROOT / "data" / "metadata"
SPLIT_DIR = ROOT / "data" / "splits"
DOCS = ROOT / "docs" / "research"

SEED = 42
RATIOS = {"train": 0.70, "val": 0.15, "test": 0.15}

COLUMNS = [
    "sample_id", "dataset", "speaker_id", "file_path", "duration", "sample_rate",
    "emotion", "emotion_intensity", "valence", "arousal",
    "mental_health_label", "transcript", "split",
]

# ---- label tables (from each dataset's official documentation) ----
RAVDESS_EMOTION = {
    "01": "neutral", "02": "calm", "03": "happy", "04": "sad",
    "05": "angry", "06": "fearful", "07": "disgust", "08": "surprised",
}
RAVDESS_INTENSITY = {"01": "normal", "02": "strong"}
RAVDESS_STATEMENT = {"01": "Kids are talking by the door", "02": "Dogs are sitting by the door"}

CREMAD_EMOTION = {"ANG": "angry", "DIS": "disgust", "FEA": "fearful",
                  "HAP": "happy", "NEU": "neutral", "SAD": "sad"}
CREMAD_INTENSITY = {"LO": "low", "MD": "medium", "HI": "high"}  # XX = unspecified -> left empty


# ------------------------------------------------------------------ helpers
def wav_files(folder):
    return sorted(p for p in folder.rglob("*") if p.is_file() and p.suffix.lower() == ".wav")


def wav_info(path):
    """Return (duration_s, sample_rate, channels) or None if unreadable."""
    try:
        with wave.open(str(path), "rb") as w:
            rate = w.getframerate()
            return w.getnframes() / float(rate), rate, w.getnchannels()
    except Exception:
        return None


def rel(path):
    return path.relative_to(ROOT).as_posix()


def dataset_dirs():
    if not RAW.is_dir():
        return []
    return sorted(d for d in RAW.iterdir() if d.is_dir())


# ------------------------------------------------------------------ inspect
def cmd_inspect():
    dirs = dataset_dirs()
    if not dirs:
        sys.exit(f"No dataset folders found in {RAW}. Put RAVDESS / CREMA-D there first.")
    DOCS.mkdir(parents=True, exist_ok=True)
    rng = random.Random(SEED)
    lines = [f"# Dataset Inventory\n", f"Generated: {date.today()}  (script: scripts/phase2_data.py inspect)\n"]

    for d in dirs:
        all_files = [p for p in d.rglob("*") if p.is_file()]
        ext = Counter(p.suffix.lower() or "(none)" for p in all_files)
        wavs = wav_files(d)
        subdirs = sorted({p.parent.relative_to(d).parts[0] for p in all_files if p.parent != d})
        sample = rng.sample(wavs, min(300, len(wavs))) if wavs else []
        infos = [i for i in (wav_info(p) for p in sample) if i]
        rates = Counter(i[1] for i in infos)
        chans = Counter(i[2] for i in infos)
        durs = [i[0] for i in infos]

        lines.append(f"\n## {d.name}\n")
        lines.append(f"- Folder: `{rel(d)}`")
        lines.append(f"- Total files: {len(all_files)}  |  by extension: {dict(ext)}")
        lines.append(f"- WAV files: {len(wavs)}")
        lines.append(f"- Top-level subfolders: {len(subdirs)}  (first 8: {subdirs[:8]})")
        lines.append(f"- Example filenames: {[p.name for p in wavs[:5]]}")
        if infos:
            lines.append(f"- Checked {len(infos)} WAVs: sample rates {dict(rates)}, channels {dict(chans)}")
            lines.append(f"- Duration (s): min {min(durs):.2f}, mean {sum(durs)/len(durs):.2f}, max {max(durs):.2f}")
        else:
            lines.append("- No readable WAV headers (not WAV, or different format).")
        lines.append("- Transcripts / mental-health labels: **not checked automatically - read the dataset documentation.**")
        lines.append(f"- Parser available: {'yes' if parser_for(d) else 'NO (needs a custom parser)'}")

    out = DOCS / "dataset_inventory.md"
    out.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("\n".join(lines))
    print(f"\nSaved: {rel(out)}")


# ------------------------------------------------------------------ parsers
def parse_ravdess(folder):
    rows, skipped = [], Counter()
    for p in wav_files(folder):
        parts = p.stem.split("-")
        if len(parts) != 7 or not all(x.isdigit() for x in parts):
            skipped["filename does not match RAVDESS 7-field pattern"] += 1
            continue
        modality, channel, emo, inten, stmt, rep, actor = parts
        if modality != "03" or channel != "01":
            skipped["not audio-only speech (modality!=03 or vocal channel!=01)"] += 1
            continue
        if emo not in RAVDESS_EMOTION or inten not in RAVDESS_INTENSITY:
            skipped["unknown emotion/intensity code"] += 1
            continue
        info = wav_info(p)
        rows.append({
            "sample_id": f"ravdess_{p.stem}", "dataset": "RAVDESS",
            "speaker_id": f"ravdess_{actor}", "file_path": rel(p),
            "duration": round(info[0], 3) if info else "", "sample_rate": info[1] if info else "",
            "emotion": RAVDESS_EMOTION[emo], "emotion_intensity": RAVDESS_INTENSITY[inten],
            "valence": "", "arousal": "", "mental_health_label": "",
            "transcript": RAVDESS_STATEMENT.get(stmt, ""), "split": "",
            "_gender_group": "female" if int(actor) % 2 == 0 else "male",  # official: even actor = female
        })
    return rows, skipped


def parse_cremad(folder):
    rows, skipped = [], Counter()
    for p in wav_files(folder):
        parts = p.stem.split("_")
        if len(parts) != 4 or not parts[0].isdigit():
            skipped["filename does not match CREMA-D pattern"] += 1
            continue
        actor, _sentence, emo, level = parts
        if emo not in CREMAD_EMOTION:
            skipped["unknown emotion code"] += 1
            continue
        info = wav_info(p)
        rows.append({
            "sample_id": f"cremad_{p.stem}", "dataset": "CREMA-D",
            "speaker_id": f"cremad_{actor}", "file_path": rel(p),
            "duration": round(info[0], 3) if info else "", "sample_rate": info[1] if info else "",
            "emotion": CREMAD_EMOTION[emo], "emotion_intensity": CREMAD_INTENSITY.get(level, ""),
            "valence": "", "arousal": "", "mental_health_label": "",
            "transcript": "",  # sentence text not stored in filenames; left empty on purpose
            "split": "", "_gender_group": "all",
        })
    return rows, skipped


def parser_for(folder):
    name = folder.name.lower()
    if "ravdess" in name:
        return parse_ravdess
    if "crema" in name:
        return parse_cremad
    return None


# ------------------------------------------------------------------ splitting
def split_speakers(speakers, rng):
    speakers = sorted(speakers)
    rng.shuffle(speakers)
    n = len(speakers)
    n_val = max(1, round(n * RATIOS["val"])) if n >= 3 else 0
    n_test = max(1, round(n * RATIOS["test"])) if n >= 3 else 0
    return {
        "val": speakers[:n_val],
        "test": speakers[n_val:n_val + n_test],
        "train": speakers[n_val + n_test:],
    }


def assign_splits(rows):
    """Speaker-independent. Groups (e.g. gender for RAVDESS) are split separately for balance."""
    rng = random.Random(SEED)
    groups = defaultdict(set)
    for r in rows:
        groups[r["_gender_group"]].add(r["speaker_id"])
    speaker_split = {}
    for g in sorted(groups):
        for split, spk in split_speakers(groups[g], rng).items():
            for s in spk:
                speaker_split[s] = split
    for r in rows:
        r["split"] = speaker_split[r["speaker_id"]]
    return speaker_split


# ------------------------------------------------------------------ build
def cmd_build():
    dirs = dataset_dirs()
    all_rows, summary, unparsed = [], {}, []
    split_record = {"seed": SEED, "ratios": RATIOS, "method": "speaker-independent; seeded shuffle", "datasets": {}}

    for d in dirs:
        parser = parser_for(d)
        if not parser:
            unparsed.append(d.name)
            continue
        rows, skipped = parser(d)
        if not rows:
            print(f"[{d.name}] no valid files found (skipped: {dict(skipped)})")
            continue
        speaker_split = assign_splits(rows)
        # leakage check: every speaker in exactly one split
        by_speaker = defaultdict(set)
        for r in rows:
            by_speaker[r["speaker_id"]].add(r["split"])
        assert all(len(v) == 1 for v in by_speaker.values()), "LEAKAGE: speaker in multiple splits"
        split_record["datasets"][d.name] = {
            s: sorted(k for k, v in speaker_split.items() if v == s) for s in RATIOS
        }
        summary[d.name] = (rows, skipped)
        all_rows.extend(rows)

    if not all_rows:
        sys.exit("No metadata built. Run 'inspect' first and check folder names (must contain 'ravdess' or 'crema').")

    META_DIR.mkdir(parents=True, exist_ok=True)
    SPLIT_DIR.mkdir(parents=True, exist_ok=True)
    DOCS.mkdir(parents=True, exist_ok=True)

    with open(META_DIR / "metadata.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=COLUMNS, extrasaction="ignore")
        w.writeheader()
        w.writerows(all_rows)
    (SPLIT_DIR / "speaker_split_v1.json").write_text(json.dumps(split_record, indent=2), encoding="utf-8")

    # ---- report ----
    md = ["# Metadata & Split Report\n",
          f"Generated: {date.today()}  |  seed={SEED}  |  split ratios (by speaker): {RATIOS}\n",
          "Fields **not available** in these datasets and therefore left empty: valence, arousal, mental_health_label.",
          "Emotion labels differ between datasets (RAVDESS has calm/surprised; CREMA-D does not).\n"]
    for name, (rows, skipped) in summary.items():
        speakers = {r["speaker_id"] for r in rows}
        durs = [r["duration"] for r in rows if r["duration"] != ""]
        rates = Counter(r["sample_rate"] for r in rows)
        md.append(f"\n## {name}\n")
        md.append(f"- Files used: {len(rows)}  |  speakers: {len(speakers)}  |  skipped: {dict(skipped) or 'none'}")
        md.append(f"- Total duration: {sum(durs)/3600:.2f} h  |  sample rates: {dict(rates)}")
        md.append("- Leakage check (each speaker in exactly one split): **PASS**\n")
        md.append("| Split | Speakers | Files |")
        md.append("|---|---|---|")
        for s in RATIOS:
            md.append(f"| {s} | {len({r['speaker_id'] for r in rows if r['split']==s})} | {sum(1 for r in rows if r['split']==s)} |")
        emos = sorted({r["emotion"] for r in rows})
        md.append("\nClass distribution (files):\n")
        md.append("| Emotion | " + " | ".join(RATIOS) + " | total |")
        md.append("|---|" + "---|" * (len(RATIOS) + 1))
        for e in emos:
            counts = [sum(1 for r in rows if r["emotion"] == e and r["split"] == s) for s in RATIOS]
            md.append(f"| {e} | " + " | ".join(map(str, counts)) + f" | {sum(counts)} |")
    if unparsed:
        md.append(f"\n## Not parsed (no parser yet)\n\n{unparsed}")
    (DOCS / "metadata_report.md").write_text("\n".join(md) + "\n", encoding="utf-8")

    print("\n".join(md))
    print("\nSaved: data/metadata/metadata.csv, data/splits/speaker_split_v1.json, docs/research/metadata_report.md")


if __name__ == "__main__":
    if len(sys.argv) != 2 or sys.argv[1] not in ("inspect", "build"):
        sys.exit("Usage: python scripts\\phase2_data.py [inspect|build]")
    {"inspect": cmd_inspect, "build": cmd_build}[sys.argv[1]]()
