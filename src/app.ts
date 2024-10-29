import express, { Application, Response } from "express";
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
    this.app.get('/health', (_, res: Response) => { res.send('GET request to homepage') });
    this.app.use('/task', taskcontroller)
    this.app.use('/category', categorycontroller)
    
  }
}

export const app = new APP().app