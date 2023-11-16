import pool from "../database/db";
import { UserProfile, updateUserProfile } from "../models/types";

class UserDetailsRepository {
  async createUserProfile(
    username: string,
    description: string,
    country_of_residence: string,
    mobile_phone_number: string,
    birthdate: string
  ): Promise<string> {
    try {
      const query =
        "INSERT INTO user_profiles (username, description, country_of_residence, mobile_phone_number, birthdate) VALUES ($1, $2, $3, $4, $5) RETURNING profile_id";
      const result = await pool.query(query, [
        username,
        description,
        country_of_residence,
        mobile_phone_number,
        birthdate,
      ]);

      if (result.rows.length > 0 && result.rows[0].profile_id) {
        return result.rows[0].profile_id;
      } else {
        throw new Error("Error creating user: Profile ID not returned");
      }
    } catch (error) {
      console.error("Error creating user:", (error as Error).message);
      throw new Error("Error creating user");
    }
  }

  async updateUserProfile(
    profileId: string,
    newData: UserProfile
  ): Promise<void> {
    try {
      const query = `
        UPDATE user_profiles
        SET
          username = $1,
          description = $2,
          country_of_residence = $3,
          mobile_phone_number = $4,
          birthdate = $5
        WHERE profile_id = $6
      `;

      await pool.query(query, [
        newData.username,
        newData.description,
        newData.country_of_residence,
        newData.mobile_phone_number,
        newData.birthdate,
        profileId,
      ]);
    } catch (error) {
      console.error("Error updating user profile:", (error as Error).message);
      throw new Error("Error updating user profile");
    }
  }

  async deleteUserProfile(userId: string): Promise<void> {
    try {
      const query = "DELETE FROM user_profiles WHERE profile_id = $1";
      await pool.query(query, [userId]);
    } catch (error) {
      console.error("Error deleting user profile:", (error as Error).message);
      throw new Error("Error deleting user profile");
    }
  }
  async getUserProfileById(userId: string): Promise<UserProfile | null> {
    try {
      const query = "SELECT * FROM user_profiles WHERE profile_id = $1";
      const result = await pool.query(query, [userId]);

      if (result.rows.length > 0) {
        return result.rows[0] as UserProfile;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error retrieving user profile:", (error as Error).message);
      throw new Error("Error retrieving user profile");
    }
  }
}

export { UserDetailsRepository };
