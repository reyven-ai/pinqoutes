import pool from "../../database/db";
import { Comments, CommentsData } from "./comment.types";

class UserCommentsRepository {
  async createComment(
    userId: string,
    pinId: string,
    comment: string,
    created_at: Date
  ): Promise<Comments | null> {
    try {
      const query =
        "INSERT INTO comments (user_id, pin_id, comment, created_at) VALUES ($1, $2, $3, $4) RETURNING *";
      const result = await pool.query(query, [
        userId,
        pinId,
        comment,
        created_at,
      ]);

      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        throw new Error("Error saving comment");
      }
    } catch (error) {
      console.error("Error:", (error as Error).message);
      throw new Error("Error saving comment");
    }
  }

  async getComment(pinId: string): Promise<CommentsData[]> {
    try {
      const query = `
        SELECT comments.*, pins.created_by, pins.profile_picture_url
        FROM comments
        JOIN pins ON comments.pin_id = pins.id
        WHERE comments.pin_id = $1
      `;
      const result = await pool.query(query, [pinId]);

      console.log("Fetched data:", result.rows);

      if (result.rows.length > 0) {
        return result.rows;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error:", (error as Error).message);
      throw new Error("Error fetching comments pinqoutes");
    }
  }

  async countCommentsForPin(pinId: string): Promise<number> {
    try {
      const query = "SELECT COUNT(*) FROM comments WHERE pin_id = $1";
      const result = await pool.query(query, [pinId]);
      return parseInt(result.rows[0].count, 10);
    } catch (error) {
      console.error("Error:", (error as Error).message);
      throw new Error("Error fetching pin comments count");
    }
  }

  async hasUserCommentPin(userId: string, pinId: string): Promise<boolean> {
    try {
      const query =
        "SELECT COUNT(*) FROM comments WHERE user_id = $1 AND pin_id = $2";
      const result = await pool.query(query, [userId, pinId]);
      return parseInt(result.rows[0].count, 10) > 0;
    } catch (error) {
      console.error("Error:", (error as Error).message);
      throw new Error("Error checking if user comment pin");
    }
  }
}

export { UserCommentsRepository };
