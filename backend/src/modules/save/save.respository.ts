import pool from "../../database/db";
import { PinData } from "../pin/pin.types";
import { SavedPinqoutesData } from "./save.types";

class UserSaveRepository {
  async createSave(
    userId: string,
    pinId: string,
    created_at: Date
  ): Promise<SavedPinqoutesData | null> {
    try {
      const query =
        "INSERT INTO saved_pins (user_id, pin_id, created_at) VALUES ($1, $2, $3) RETURNING *";
      const result = await pool.query(query, [userId, pinId, created_at]);

      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        throw new Error("Error saving pinqoutes");
      }
    } catch (error) {
      console.error("Error:", (error as Error).message);
      throw new Error("Error saving pinqoutes");
    }
  }

  async removeSave(userId: string, pinId: string): Promise<void> {
    try {
      const query = "DELETE FROM saved_pins WHERE user_id = $1 AND pin_id = $2";
      await pool.query(query, [userId, pinId]);
    } catch (error) {
      console.error("Error:", (error as Error).message);
      throw new Error("Error removing pinqoutes");
    }
  }

  async getSave(userId: string): Promise<PinData[]> {
    try {
      const query = `
        SELECT saved_pins.*, pins.title, pins.description, pins.file_type, pins.file_url, pins.created_by, pins.profile_picture_url
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
      throw new Error("Error fetching saved pinqoutes");
    }
  }

  async checkPinqoutesExists(pinId: string): Promise<boolean> {
    try {
      const query = "SELECT COUNT(*) FROM pins WHERE id = $1";
      const result = await pool.query(query, [pinId]);

      return result.rows[0].count > 0;
    } catch (error) {
      console.error("Error:", (error as Error).message);
      throw new Error("Error checking if pinqoutes exists");
    }
  }

  async hasUserSavedPin(userId: string, pinId: string): Promise<boolean> {
    try {
      const query =
        "SELECT COUNT(*) FROM saved_pins WHERE user_id = $1 AND pin_id = $2";
      const result = await pool.query(query, [userId, pinId]);
      return parseInt(result.rows[0].count, 10) > 0;
    } catch (error) {
      console.error("Error:", (error as Error).message);
      throw new Error("Error checking if user saved pinqoutes");
    }
  }
}

export { UserSaveRepository };
