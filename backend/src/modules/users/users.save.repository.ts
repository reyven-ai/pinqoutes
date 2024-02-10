import pool from "../../database/db";
import { PinData } from "../pin/pin.types";
import { SavedData } from "./users.save.types";

class UserSavePinRepository {
  async saveUserPin(
    userId: string,
    pinId: string,
    title: string,
    description: string,
    image_url: string,
    created_at: Date,
    created_by: string
  ): Promise<SavedData | null> {
    try {
      const query =
        "INSERT INTO saved_pins (user_id, pin_id, title, description, image_url, created_by, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
      const result = await pool.query(query, [
        userId,
        pinId,
        title,
        description,
        image_url,
        created_by,
        created_at,
      ]);

      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        throw new Error("Error saving pin");
      }
    } catch (error) {
      console.error("Error:", (error as Error).message);
      throw new Error("Error saving pin");
    }
  }

  async removeUserPin(userId: string, pinId: string): Promise<void> {
    try {
      const query = "DELETE FROM saved_pins WHERE user_id = $1 AND pin_id = $2";
      await pool.query(query, [userId, pinId]);
    } catch (error) {
      console.error("Error:", (error as Error).message);
      throw new Error("Error removing pin");
    }
  }

  async getSavedPins(userId: string): Promise<PinData[]> {
    try {
      const query = "SELECT * FROM saved_pins WHERE user_id = $1";
      const result = await pool.query(query, [userId]);

      if (result.rows.length > 0) {
        return result.rows;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error:", (error as Error).message);
      throw new Error("Error fetching saved pins");
    }
  }
}

export { UserSavePinRepository };
