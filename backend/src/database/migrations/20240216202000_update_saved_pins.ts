import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("saved_pins", function (table) {
    table.dropColumn("title");
    table.dropColumn("description");
    table.dropColumn("image_url");
    table.dropColumn("created_by");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("saved_pins", function (table) {
    table.string("title");
    table.string("description");
    table.string("image_url");
    table.string("created_by");
  });
}
