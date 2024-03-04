import pool from "../../database/db";
import { PinData } from "../pin/pin.types";
import { SavedPinData } from "./users.save.types";

class UserSavePinRepository {
  async saveUserPin(
    userId: string,
    pinId: string,
    created_at: Date
  ): Promise<SavedPinData | null> {
    try {
      const query =
        "INSERT INTO saved_pins (user_id, pin_id, created_at) VALUES ($1, $2, $3) RETURNING *";
      const result = await pool.query(query, [userId, pinId, created_at]);

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
      const query = `
        SELECT saved_pins.*, pins.title, pins.description, pins.image_url, pins.created_by
        FROM saved_pins
        JOIN pins ON saved_pins.pin_id = pins.id
        WHERE saved_pins.user_id = $1
      `;
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

  async checkPinExists(pinId: string): Promise<boolean> {
    try {
      const query = "SELECT COUNT(*) FROM pins WHERE id = $1";
      const result = await pool.query(query, [pinId]);

      // If the count is greater than 0, it means the pin exists
      return result.rows[0].count > 0;
    } catch (error) {
      console.error("Error:", (error as Error).message);
      throw new Error("Error checking if pin exists");
    }
  }
}

export { UserSavePinRepository };
