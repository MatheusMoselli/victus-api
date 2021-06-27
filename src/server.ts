require('dotenv').config();
import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { router } from "./routes";
import dbConnection from "./database";
import cors from "cors";

const db = new dbConnection(); 
const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof Error) {
    return res.status(400).json({
      error: err.message
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error"
  })
});

app.listen(process.env.PORT);