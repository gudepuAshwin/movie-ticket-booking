import pg from "pg";

const pool = new pg.Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5433,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "book_my_ticket",
  max: 20,
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 0,
});

export default pool;
