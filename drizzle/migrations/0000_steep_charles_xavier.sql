DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('admin', 'customer');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "account" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"externalId" varchar,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"role" "role" DEFAULT 'customer' NOT NULL,
	CONSTRAINT "account_email_unique" UNIQUE("email")
);
