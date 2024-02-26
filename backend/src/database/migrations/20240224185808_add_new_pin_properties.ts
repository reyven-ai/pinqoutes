import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("pins", function (table) {
    table.string("title");
    table.string("link");
    table.string("created_by");
  });
}

export async function down(knex: Knex): Promise<void> {}
