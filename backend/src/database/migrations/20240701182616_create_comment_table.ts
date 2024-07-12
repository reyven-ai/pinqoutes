import type { Knex } from "knex";

// Comments Table Migration
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("comments", function (table) {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .references("user_id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .integer("pin_id")
      .unsigned()
      .references("id")
      .inTable("pins")
      .onDelete("CASCADE");
    table.text("comment");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("comments");
}
