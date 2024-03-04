import { CreatePinInput, PinData, UpdatePinInput } from "./pin.types";
import pool from "../../database/db";

class UserPinRepository {
  async createUserPin(
    userId: number,
    title: string,
    description: string,
    image_url: string,
    link: string,
    created_at: Date,
    created_by: string
  ): Promise<CreatePinInput> {
    try {
      const query =
        "INSERT INTO pins (user_id, title, description, image_url, link, created_at, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";

      const result = await pool.query(query, [
        userId,
        title,
        description,
        image_url,
        link,
        created_at,
        created_by,
      ]);

      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        throw new Error("Error uploading user pin");
      }
    } catch (error) {
      console.error("Error:", (error as Error).message);
      throw new Error("Error uploading pin");
    }
  }

  async getAllPins(): Promise<PinData[]> {
    try {
      const query = "SELECT * FROM pins";
      const result = await pool.query(query);

      return result.rows as PinData[];
    } catch (error) {
      console.error("Error retrieving all pins:", (error as Error).message);
      throw new Error("Error retrieving all pins");
    }
  }

  async getUserPins(userId: string): Promise<PinData[]> {
    try {
      const query = "SELECT * FROM pins WHERE user_id = $1";
      const result = await pool.query(query, [userId]);

      return result.rows as PinData[];
    } catch (error) {
      console.error("Error retrieving user pins:", (error as Error).message);
      throw new Error("Error retrieving user pins");
    }
  }

  async getPinDetails(id: string): Promise<PinData | null> {
    try {
      const query = "SELECT * FROM pins WHERE id = $1";
      const result = await pool.query(query, [id]);

      if (result.rows.length > 0) {
        return result.rows[0] as PinData;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error retrieving user profile:", (error as Error).message);
      throw new Error("Error retrieving user profile");
    }
  }

  async updatePinDetails(
    id: string,
    newData: UpdatePinInput
  ): Promise<UpdatePinInput | null> {
    try {
      const query = `UPDATE pins SET user_Id = $1, title = $2, description = $3, image_url = $4, link = $5, created_by = $6, updated_at = $7 WHERE id= $8 RETURNING *`;
      const result = await pool.query(query, [
        newData.user_id,
        newData.title,
        newData.description,
        newData.image_url,
        newData.link,
        newData.created_by,
        newData.updated_at,
        id,
      ]);
      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        throw new Error("Error updating user pin: User pin not returned");
      }
    } catch (error) {
      console.error("Error:", (error as Error).message);
      throw new Error("Error updating pin");
    }
  }

  async deleteUserPin(id: string): Promise<PinData | null> {
    try {
      const query = "DELETE FROM pins WHERE id = $1 RETURNING *";
      const result = await pool.query(query, [id]);

      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error:", (error as Error).message);
      throw new Error("Error deleting pin");
    }
  }
}

export { UserPinRepository };
