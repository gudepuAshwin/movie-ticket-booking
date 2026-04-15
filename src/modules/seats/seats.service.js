import pool from "../../common/config/db.js";
import { findUserById } from "../user/user.dataTable.js";
import { sendBookingEmail } from "../../common/config/mail.config.js";

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const bookSeat = async (req) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    throw createError("Invalid seat id", 400);
  }

  const user = await findUserById(req.user.id);
  if (!user) {
    throw createError("User not found", 404);
  }

  const name = user.full_name;
  const email = user.email;
  const conn = await pool.connect();

  try {
    await conn.query("BEGIN");

    const sql = "SELECT * FROM seats where id = $1 FOR UPDATE";
    const result = await conn.query(sql, [id]);

    if (result.rowCount === 0) {
      throw createError("Seat not found", 404);
    }

    const seat = result.rows[0];
    if (seat.isbooked === 1 || seat.isbooked === true || seat.isbooked === "1") {
      throw createError("Seat already booked", 409);
    }

    const sqlU =
      "update seats set isbooked = 1, name = $2, user_id = $3 where id = $1";
    await conn.query(sqlU, [id, name, req.user.id]);

    await conn.query("COMMIT");
    sendBookingEmail(email, name, id).catch((err) =>
      console.error("Email failed:", err),
    );

    return {
      message: "Seat booked successfully",
      seatId: id,
    };
  } catch (err) {
    await conn.query("ROLLBACK").catch(() => {});
    throw err;
  } finally {
    conn.release();
  }
};
