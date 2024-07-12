import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("notifications", function (table) {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .references("user_id")
      .inTable("users")
      .onDelete("CASCADE");
    table.string("type"); // e.g., 'like', 'comment', 'follow', etc.
    table.integer("entity_id"); // e.g., pin_id, comment_id, etc.
    table.string("message"); // Optional: a message to display
    table.boolean("read").defaultTo(false); // To check if the notification is read
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("notifications");
}
