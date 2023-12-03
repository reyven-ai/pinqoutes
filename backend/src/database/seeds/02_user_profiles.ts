import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("user_profiles").del();

  // Inserts seed entries
  await knex("user_profiles").insert([
    {
      profile_id: 1,
      user_id: 1,
      username: "testai1",
      description: "Software Developer",
      country_of_residence: "Tallinn, Estonia",
      mobile_phone_number: "+37255544033",
      birthdate: "2003-10-10",
    },
    {
      profile_id: 2,
      user_id: 2,
      username: "testai2",
      description: "Software Developer",
      country_of_residence: "Tallinn, Estonia",
      mobile_phone_number: "+37255544033",
      birthdate: "2003-10-10",
    },
    {
      profile_id: 3,
      user_id: 3,
      username: "testai3",
      description: "Software Developer",
      country_of_residence: "Tallinn, Estonia",
      mobile_phone_number: "+37255544033",
      birthdate: "2003-10-10",
    },
  ]);
}
