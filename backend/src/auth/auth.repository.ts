import pool from "../database/db";
import { UserAuthData } from "./auth.types";

class UserRepository {
  async getByEmail(email: string): Promise<UserAuthData | null> {
    try {
      const query = "SELECT * FROM users WHERE email = $1";
      const result = await pool.query(query, [email]);
      return result.rows[0] || null;
    } catch (error) {
      console.error("Error fetching user by email:", (error as Error).message);
      throw new Error("Error fetching user by email");
    }
  }

  async createUser(
    email: string,
    hashedPassword: string
  ): Promise<UserAuthData> {
    try {
      const query =
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *";
      console.log("WASSUP");
      const result = await pool.query(query, [email, hashedPassword]);
      // return result.rows[0].user_id;
      return result.rows[0];
    } catch (error) {
      console.error("Error creating user:", (error as Error).message);
      throw new Error("Error creating user");
    }
  }
}

export default UserRepository;
