const { validationResult } = require("express-validator");

exports.validationmiddleware = (req, res, next) => {
  try {
    const result = validationResult(req);

    if (result.isEmpty()) {
      return next();
    }

    const firstError = result.array()[0].msg;
    console.log("Validation Error:", firstError); // <-- add this
    throw new Error(firstError);

  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
