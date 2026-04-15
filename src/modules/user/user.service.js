import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "./user.dataTable.js";

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const registerUser = async (data) => {
  const { full_name, email, password } = data;
  try {
    const existing = await findUserByEmail(email);
    if (existing) throw createError("User already exists", 409);
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await createUser(full_name, email, hashedPassword);
    return {
      id: result.id,
      full_name: result.full_name,
      email: result.email,
    };
  } catch (err) {
    if (err.statusCode) throw err;
    throw createError("Unable to register user", 500);
  }
};

export const loginUser = async (data) => {
  const { email, password } = data;
  try {
    const existing = await findUserByEmail(email);

    if (!existing) throw createError("Invalid email or password", 401);
    const result = await bcrypt.compare(password, existing.password);
    if (!result) throw createError("Invalid email or password", 401);
    if (result) {
      const token = jwt.sign(
        {
          id: existing.id,
        },
        process.env.JWT_SECRET,
      );
      return {
        token,
        full_name: existing.full_name,
        email: existing.email,
      };
    }
  } catch (err) {
    if (err.statusCode) throw err;
    throw createError("Unable to login", 500);
  }
};
