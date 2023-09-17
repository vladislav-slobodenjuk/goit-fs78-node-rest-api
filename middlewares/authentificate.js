import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import { User } from "../models/User.js";

const { JWT_SECRET } = process.env;

const authentificate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") return next(HttpError(401, "Not authorized"));

  try {
    const { id } = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(id);
    if (!user) return next(HttpError(401, "Not authorized"));

    req.user = user;
    return next();
    //
  } catch (error) {
    next(HttpError(401, "Not authorized"));
  }
};

export default authentificate;
