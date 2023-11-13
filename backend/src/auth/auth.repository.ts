import pool from "../database/db";
import { User } from "./types";

class UserRepository {
  async getByEmail(email: string): Promise<User | null> {
    try {
      const query = "SELECT * FROM users WHERE email = $1";
      const result = await pool.query(query, [email]);
      return result.rows[0] || null;
    } catch (error) {
      throw new Error("Error fetching user by email");
    }
  }

  async createUser(email: string, hashedPassword: string) {
    const query =
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING user_id";
    const result = await pool.query(query, [email, hashedPassword]);
    return result.rows[0].user_id;
  }
}

export default UserRepository;
