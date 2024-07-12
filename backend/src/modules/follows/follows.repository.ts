import pool from "../../database/db";
import { Follow } from "./follows.types";

class UserFollowsRepository {
  async followUser(
    followerId: string,
    followedId: string,
    created_at: Date
  ): Promise<Follow | null> {
    try {
      const query = `
        INSERT INTO follows (follower_id, followed_id, created_at) 
        VALUES ($1, $2, $3) 
        RETURNING *
      `;
      const result = await pool.query(query, [
        followerId,
        followedId,
        created_at,
      ]);

      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        throw new Error("Error following user");
      }
    } catch (error) {
      console.error("Error:", (error as Error).message);
      throw new Error("Error following user");
    }
  }

  // Unfollow a user
  async unfollowUser(followerId: string, followedId: string): Promise<void> {
    try {
      const query =
        "DELETE FROM follows WHERE follower_id = $1 AND followed_id = $2";
      const result = await pool.query(query, [followerId, followedId]);

      if (result.rowCount === 0) {
        throw new Error("No follow relationship found to delete");
      }
    } catch (error) {
      console.error("Error unfollowing user:", error);
      throw new Error("Error unfollowing user");
    }
  }

  async countFollowersForUser(followedId: string): Promise<number> {
    try {
      const query = "SELECT COUNT(*) FROM follows WHERE followed_id = $1";
      const result = await pool.query(query, [followedId]);
      return parseInt(result.rows[0].count, 10);
    } catch (error) {
      console.error("Error:", (error as Error).message);
      throw new Error("Error fetching followers count");
    }
  }

  async countFollowingForUser(followerId: string): Promise<number> {
    try {
      const query = "SELECT COUNT(*) FROM follows WHERE follower_id = $1";
      const result = await pool.query(query, [followerId]);
      return parseInt(result.rows[0].count, 10);
    } catch (error) {
      console.log("Error:", (error as Error).message);
      throw new Error("Error fetching followers count");
    }
  }

  async isFollowing(followerId: string, followedId: string): Promise<boolean> {
    try {
      const query =
        "SELECT COUNT(*) FROM follows WHERE follower_id = $1 AND followed_id = $2";
      const result = await pool.query(query, [followerId, followedId]);
      return parseInt(result.rows[0].count, 10) > 0;
    } catch (error) {
      console.error("Error:", (error as Error).message);
      throw new Error("Error checking follow status");
    }
  }

  async getFollowing(userId: string): Promise<Follow[]> {
    try {
      const query = `
        SELECT follows.*, users.email, users.username
        FROM follows
        JOIN users ON follows.followed_id = users.user_id
        WHERE follows.follower_id = $1
      `;
      const result = await pool.query(query, [userId]);

      if (result.rows.length > 0) {
        return result.rows;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error:", (error as Error).message);
      throw new Error("Error fetching following list");
    }
  }

  async getFollowers(userId: string): Promise<Follow[]> {
    try {
      const query = `
        SELECT follows.*, users.email, users.username
        FROM follows
        JOIN users ON follows.follower_id = users.user_id
        WHERE follows.followed_id = $1
      `;
      const result = await pool.query(query, [userId]);

      if (result.rows.length > 0) {
        return result.rows;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error:", (error as Error).message);
      throw new Error("Error fetching followers list");
    }
  }
}

export default UserFollowsRepository;
