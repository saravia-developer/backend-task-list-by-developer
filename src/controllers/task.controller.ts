import { NextFunction, Request, Response, Router } from "express";
import { TaskServices } from "../services/task.service";
import { taskMiddleware } from "../middleware/task.middleware";
import { taskvalidator } from "../validators/task.validators";

class TaskController {
  router: Router

  constructor() {
    this.router = Router()
    this.router.get('/', this.getTask.bind(this))
    this.router.post('/create', taskvalidator, taskMiddleware.validatorForm.bind(this), this.createTask.bind(this))
    this.router.patch('/:id', this.updateTask.bind(this))
    this.router.delete('/:id', this.deleteTask.bind(this))
  }

  async getTask(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await TaskServices.getTask()
      res.json({ success: true, response }) 
    } catch (error) {
      next(error)
    }
  }

  async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { nameTask, description, isCompleted, estimatedTime, category } = req.body
      const response = await TaskServices.createTask({ nameTask, description, isCompleted, estimatedTime, category });
      res.json({ success: true, data: response })
    } catch (error) {
      next(error)
    }
  }

  async updateTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { nameTask, description, estimatedTime, category } = req.body;
      const { id } = req.params
      const response = await TaskServices.updateTask(parseInt(id), { nameTask, description, estimatedTime, category });
      res.json({ success: true, data: response })
    } catch (error) {
      next(error)
    }
  }

  async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const response = await TaskServices.deleteTask(parseInt(id));
      res.json({ success: true, data: response })
    } catch (error) {
      next(error)
    }
  }
}

export const taskcontroller = new TaskController().router