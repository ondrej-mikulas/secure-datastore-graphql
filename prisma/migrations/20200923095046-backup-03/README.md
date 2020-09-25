# Migration `20200923095046-backup-03`

This migration has been generated by Ondrej Mikuláš at 9/23/2020, 11:50:46 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Store" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdDateTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedDateTime" DATETIME NOT NULL,
    "deletedDateTime" DATETIME
);
INSERT INTO "new_Store" ("id", "value") SELECT "id", "value" FROM "Store";
DROP TABLE "Store";
ALTER TABLE "new_Store" RENAME TO "Store";
CREATE UNIQUE INDEX "Store.id_unique" ON "Store"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200923094655-backup-01..20200923095046-backup-03
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url = "***"
 }
 model User {
   email String  @unique
@@ -25,5 +25,9 @@
 model Store {
   id       String  @unique
   value    String
+  createdDateTime DateTime @default(now())
+  updatedDateTime DateTime @updatedAt
+  deletedDateTime DateTime?
+
 }
```

