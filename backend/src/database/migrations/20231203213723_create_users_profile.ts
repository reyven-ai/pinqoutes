import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("pins", function (table) {
    table.increments("id").primary();
    table.string("description");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("pins");
}
