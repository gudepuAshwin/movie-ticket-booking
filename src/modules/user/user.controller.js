import { registerUser, loginUser } from "./user.service.js";

export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({
      message: "User registered successfully",
      data: user,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message || "Unable to register user",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await loginUser(req.body);
    res.status(200).json({
      message: "Login successful",
      data: user,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message || "Unable to login",
    });
  }
};
