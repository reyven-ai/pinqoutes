import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("saved_pins", function (table) {
    table.increments("id").primary();
    table.integer("user_id").unsigned().references("user_id").inTable("users");
    table.integer("pin_id").unsigned().references("id").inTable("pins");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("saved_pins");
}
