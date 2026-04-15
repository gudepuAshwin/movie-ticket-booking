import { bookSeat } from "./seats.service.js";

export const book = async (req, res) => {
  try {
    const result = await bookSeat(req);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      message: err.statusCode ? err.message : "Unable to book seat",
    });
  }
};
