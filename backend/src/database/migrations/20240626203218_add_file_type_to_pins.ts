import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("pins", function (table) {
    table.string("file_type").notNullable().defaultTo("image"); // Adding new column
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("pins", function (table) {
    table.dropColumn("file_type");
  });
}
