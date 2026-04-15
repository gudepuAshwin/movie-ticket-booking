const validate = (dtoSchema) => {
  return (req, res, next) => {
    try {
      const result = dtoSchema.safeParse(req.body);
      if (!result.success)
        return res.status(400).json({
          message: "Invalid request body",
          errors: result.error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        });
      req.body = result.data;
      next();
    } catch (err) {
      return res.status(500).json({ message: "Unable to validate request" });
    }
  };
};

export default validate;
