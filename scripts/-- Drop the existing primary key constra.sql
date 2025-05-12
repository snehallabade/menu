-- Drop the existing primary key constraint
ALTER TABLE "public"."dishes_tag" DROP CONSTRAINT IF EXISTS "dishes_tag_pkey";

-- Make dish_id NOT NULL (required for it to be part of a primary key)
ALTER TABLE "public"."dishes_tag" ALTER COLUMN "dish_id" SET NOT NULL;

-- Create a new composite primary key on both dish_id and tag_name
ALTER TABLE "public"."dishes_tag" ADD PRIMARY KEY ("dish_id", "tag_name");