DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('admin', 'customer');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "account" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"role" "role" DEFAULT 'customer' NOT NULL,
	"created_at" timestamp DEFAULT '2024-03-16 11:55:23.801' NOT NULL,
	"updated_at" timestamp DEFAULT '2024-03-16 11:55:23.801' NOT NULL,
	CONSTRAINT "account_email_unique" UNIQUE("email")
);
