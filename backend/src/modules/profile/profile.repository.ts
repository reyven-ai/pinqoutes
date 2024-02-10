import {
  CreateProfileInput,
  ProfileData,
  UpdateProfileInput,
} from "./profile.types";
import pool from "../../database/db";

class UserDetailsRepository {
  async createUserProfile(
    user_id: number,
    username: string,
    description: string,
    country_of_residence: string,
    mobile_phone_number: string,
    birthdate: string
  ): Promise<CreateProfileInput> {
    try {
      const query =
        "INSERT INTO user_profiles (user_id, username, description, country_of_residence, mobile_phone_number, birthdate) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *"; // Return all columns

      const result = await pool.query(query, [
        user_id,
        username,
        description,
        country_of_residence,
        mobile_phone_number,
        birthdate,
      ]);

      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        throw new Error("Error creating user: User profile not returned");
      }
    } catch (error) {
      console.error("Error creating user:", (error as Error).message);
      throw new Error("Error creating user");
    }
  }

  async updateUserProfile(
    user_id: number,
    newData: UpdateProfileInput
  ): Promise<UpdateProfileInput | null> {
    try {
      const query = `UPDATE user_profiles SET username = $1, description = $2, country_of_residence = $3, mobile_phone_number = $4, birthdate = $5 WHERE user_id= $6 RETURNING *`;
      const result = await pool.query(query, [
        newData.username,
        newData.description,
        newData.country_of_residence,
        newData.mobile_phone_number,
        newData.birthdate,
        user_id,
      ]);

      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        throw new Error(
          "Error updating user profile: User profile not returned"
        );
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw new Error(`Error updating user profile with ID ${user_id}}`);
    }
  }

  async getSelfUserProfile(user_id: number): Promise<ProfileData | null> {
    try {
      const query = "SELECT * FROM user_profiles WHERE user_id = $1";
      const result = await pool.query(query, [user_id]);

      if (result.rows.length > 0) {
        return result.rows[0] as ProfileData;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error retrieving user profile:", (error as Error).message);
      throw new Error("Error retrieving user profile");
    }
  }

  async deleteUserProfile(user_id: string): Promise<ProfileData | null> {
    try {
      const query = "DELETE FROM user_profiles WHERE user_id = $1 RETURNING *";
      const result = await pool.query(query, [user_id]);

      if (result.rows.length > 0) {
        return result.rows[0] as ProfileData;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error deleting user profile:", (error as Error).message);
      throw new Error("Error deleting user profile");
    }
  }
}

export { UserDetailsRepository };
