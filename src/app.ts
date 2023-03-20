import "reflect-metadata";
import express from "express";
import "express-async-errors";
import { usersRouter } from "./routers/user.routes";
import { handleError } from "./errors/handleError";
import { sessionRouter } from "./routers/session.routes";

const app = express();
app.use(express.json());

app.use("/users", usersRouter);
app.use("/login", sessionRouter);

app.use(handleError);
export { app };
