import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("follows", function (table) {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .references("user_id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .integer("followed_id")
      .unsigned()
      .references("user_id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());

    // Ensure that a user cannot follow another user more than once
    table.unique(["follower_id", "followed_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("follows");
}
