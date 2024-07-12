import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("comments", function (table) {
    table.string("commented_by");
    table.string("profile_picture_url");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("comments", function (table) {
    table.dropColumn("profile_picture_url");
    table.string("commented_by");
  });
}
