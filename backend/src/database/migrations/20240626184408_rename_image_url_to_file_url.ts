import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("pins", function (table) {
    table.renameColumn("image_url", "file_url");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("pins", function (table) {
    table.renameColumn("file_url", "image_url");
  });
}
