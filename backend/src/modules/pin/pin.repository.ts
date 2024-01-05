import { UserPinData } from "./pin.types";
import pool from "../../database/db";

class UserPinRepository {
  async createUserPin(
    user_id: number,
    description: string,
    image_url: string,
    created_at: Date
  ): Promise<UserPinData> {
    try {
      const query =
        "INSERT INTO pins (user_id, description, image_url, created_at) VALUES ($1, $2, $3, $4) RETURNING *";

      const result = await pool.query(query, [
        user_id,
        description,
        image_url,
        created_at,
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
}

export { UserPinRepository };
