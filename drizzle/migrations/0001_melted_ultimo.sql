DO $$ BEGIN
 CREATE TYPE "public"."provider" AS ENUM('email', 'github', 'google');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "externalId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "provider" "provider" NOT NULL;