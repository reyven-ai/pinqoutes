import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("users").del();

  await knex("users").insert([
    { user_id: 1, email: "test130@gmail.com", password: "Password03-" },
    { user_id: 2, email: "test131@gmail.com", password: "Password03-" },
    { user_id: 3, email: "test132@gmail.com", password: "Password03-" },
  ]);
}
