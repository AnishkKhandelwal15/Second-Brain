import express from "express";
import mongoose from "mongoose"
import mainRouter from "./routes";

const app =express();

app.use(express.json());
app.use('/api/v1', mainRouter);