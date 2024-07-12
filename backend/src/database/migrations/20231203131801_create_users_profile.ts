import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("user_profiles", function (table) {
    table.increments("profile_id").primary();
    table.integer("user_id").unsigned().references("user_id").inTable("users");
    table.string("username");
    table.string("description");
    table.string("country_of_residence");
    table.string("mobile_phone_number");
    table.string("birthdate");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("user_profles");
}