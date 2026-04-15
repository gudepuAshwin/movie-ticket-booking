import pool from "../../common/config/db.js";

export const createUser = async (full_name, email, password) => {
  const result = await pool.query(
    "INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [full_name, email, password],
  );

  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  // if (result.rowCount === 0) throw new Error("user not found");
  return result.rows[0];
};

export const findUserById = async (id) => {
  const result = await pool.query("SELECT * FROM USERS WHERE ID = $1", [id]);
  // if (result.rowCount === 0) throw new Error("user not found");
  return result.rows[0];
};
