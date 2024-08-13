import express, { Application, Request, Response } from "express";
import cors from 'cors';
import { taskcontroller } from "./controllers/task.controller";
import { categorycontroller } from "./controllers/category.controller";

class APP {
  app: Application

  constructor() {
    this.app = express();
    this.app.use(cors({ origin: "*" }))
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())
    this.app.get('/health', (req: Request, res: Response) => res.send("La aplicación esta levantada"))
    this.app.use('/task', taskcontroller)
    this.app.use('/category', categorycontroller)
    
  }
}

export const app = new APP().app