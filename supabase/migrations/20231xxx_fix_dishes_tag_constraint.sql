-- First drop the existing primary key constraint
alter table "public"."dishes_tag" drop constraint "dishes_tag_pkey";

-- Drop the existing index
drop index if exists "public"."dishes_tag_pkey";

-- Make dish_id NOT NULL since it should be required for a proper relationship
alter table "public"."dishes_tag" alter column "dish_id" set not null;

-- Create a new composite primary key on both dish_id and tag_name
CREATE UNIQUE INDEX dishes_tag_pkey ON public.dishes_tag USING btree (dish_id, tag_name);

-- Add the primary key constraint using the new index
alter table "public"."dishes_tag" add constraint "dishes_tag_pkey" PRIMARY KEY using index "dishes_tag_pkey";