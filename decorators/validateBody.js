import HttpError from "../helpers/HttpError.js";

const validateBody = (schema, body) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpError(400, `missing required field '${error.message}'`));
    }
    next();
  };
  return func;
};

export default validateBody;
