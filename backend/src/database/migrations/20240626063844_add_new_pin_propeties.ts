import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("pins", function (table) {
    table.string("profile_picture_url");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("pins", function (table) {
    table.dropColumn("profile_picture_url");
  });
}
