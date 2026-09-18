from app.database.database import DATABASE_URL


print("Database configuration test")
print("----------------------------")

if DATABASE_URL:
    print("DATABASE_URL is configured.")
else:
    print("DATABASE_URL is not configured yet.")