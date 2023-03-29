import "reflect-metadata";
import express from "express";
import "express-async-errors";
import { usersRouter } from "./routers/user.routes";
import { handleError } from "./errors/handleError";
import { sessionRouter } from "./routers/session.routes";
import { contactsRouter } from "./routers/contact.routes";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

app.use("/users", usersRouter);
app.use("/login", sessionRouter);
app.use("/contacts", contactsRouter);

app.use(handleError);
export { app };
