import pool from "../../database/db";
import { PinData } from "../pin/pin.types";
import { Likes } from "./likes.types";

class UserLikesRepository {
  async createLikes(
    userId: string,
    pinId: string,
    created_at: Date
  ): Promise<Likes | null> {
    try {
      const query =
        "INSERT INTO likes (user_id, pin_id, created_at) VALUES ($1, $2, $3) RETURNING *";
      const result = await pool.query(query, [userId, pinId, created_at]);

      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        throw new Error("Error liking pin");
      }
    } catch (error) {
      console.error("Error:", (error as Error).message);
      throw new Error("Error liking pinqoutes");
    }
  }

  async removeLikes(userId: string, pinId: string): Promise<void> {
    try {
      const query = "DELETE FROM likes WHERE user_id = $1 AND pin_id = $2";
      await pool.query(query, [userId, pinId]);
    } catch (error) {
      console.error("Error:", (error as Error).message);
      throw new Error("Error unlike pinqoutes");
    }
  }

  async getLiked(userId: string): Promise<PinData[]> {
    try {
      const query = `
        SELECT likes.*, pins.title, pins.description, pins.file_type, pins.file_url, pins.created_by, pins.profile_picture_url
        FROM likes
        JOIN pins ON likes.pin_id = pins.id
        WHERE likes.user_id = $1
      `;
      const result = await pool.query(query, [userId]);

      if (result.rows.length > 0) {
        return result.rows;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error:", (error as Error).message);
      throw new Error("Error fetching liked pinqoutes");
    }
  }

  async countLikesForPin(pinId: string): Promise<number> {
    try {
      const query = "SELECT COUNT(*) FROM likes WHERE pin_id = $1";
      const result = await pool.query(query, [pinId]);
      return parseInt(result.rows[0].count, 10);
    } catch (error) {
      console.error("Error:", (error as Error).message);
      throw new Error("Error fetching pinqoutes likes count");
    }
  }

  async hasUserLikedPin(userId: string, pinId: string): Promise<boolean> {
    try {
      const query =
        "SELECT COUNT(*) FROM likes WHERE user_id = $1 AND pin_id = $2";
      const result = await pool.query(query, [userId, pinId]);
      return parseInt(result.rows[0].count, 10) > 0;
    } catch (error) {
      console.error("Error:", (error as Error).message);
      throw new Error("Error checking if user liked pinqoutes");
    }
  }
}

export { UserLikesRepository };
