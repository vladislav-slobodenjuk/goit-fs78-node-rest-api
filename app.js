import express from "express";
import logger from "morgan";
import cors from "cors";
import "dotenv/config"; // instead of call dotenv.config() after import

import contactsRouter from "./routes/api/contacts-router.js";
import authRouter from "./routes/api/auth-router.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); // handles req.body for requests with "Content-Type: application/json"
app.use(express.static("public")); // opens outer access to spicified folder

app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "server error" } = err;
  res.status(status).json({ message });
});

export default app;
