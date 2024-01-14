import { CreatePinInput, PinData, UpdatePinInput } from "./pin.types";
import pool from "../../database/db";

class UserPinRepository {
  async createUserPin(
    userId: number,
    description: string,
    image_url: string,
    created_at: Date
  ): Promise<CreatePinInput> {
    try {
      const query =
        "INSERT INTO pins (user_id, description, image_url, created_at) VALUES ($1, $2, $3, $4) RETURNING *";

      const result = await pool.query(query, [
        userId,
        description,
        image_url,
        created_at,
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
      const query = `UPDATE pins SET user_Id = $1, description = $2, image_url = $3, updated_at = $4 WHERE id= $5 RETURNING *`;
      const result = await pool.query(query, [
        newData.user_id,
        newData.description,
        newData.image_url,
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
