import express from "express";
import { router } from "./router/router";
import { PrismaClient } from "@prisma/client";

const app = express();

const prisma = new PrismaClient();

app.use(express.json());
app.use(express.static("public"));
router(app, prisma);

export { app };
