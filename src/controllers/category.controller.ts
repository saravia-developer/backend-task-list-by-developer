import { NextFunction, Request, Response, Router } from "express";
import { CategoryServices } from "../services/category.service";
import { categoryvalidators } from "../validators/category.validators";
import { categoryMiddleware } from "../middleware/category.middleware";

class CategoryController {
  router: Router

  constructor() {
    this.router = Router()
    this.router.get('/', this.getCategory.bind(this))
    this.router.get('/:id', this.getCategoryById.bind(this))
    this.router.post('/create', categoryvalidators, categoryMiddleware.validatorForm.bind(this), this.createCategory.bind(this))
    this.router.patch('/:id', this.updateCategory.bind(this))
    this.router.delete('/:id', this.deleteCategory.bind(this))
  }

  async getCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await CategoryServices.getCategory()
      res.json({ success: true, response }) 
    } catch (error) {
      next(error)
    }
  }

  async getCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const response = await CategoryServices.getCategoryById(parseInt(id))
      res.json({ success: true, response }) 
    } catch (error) {
      next(error)
    }
  }

  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { nameCategory } = req.body
      const response = await CategoryServices.createCategory({ nameCategory });
      res.json({ success: true, data: response })
    } catch (error) {
      next(error)
    }
  }

  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { nameCategory } = req.body;
      const { id } = req.params
      const response = await CategoryServices.updateCategory(parseInt(id), { nameCategory });
      res.json({ success: true, data: response })
    } catch (error) {
      next(error)
    }
  }

  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const response = await CategoryServices.deleteCategory(parseInt(id));
      res.json({ success: true, data: response })
    } catch (error) {
      next(error)
    }
  }
}

export const categorycontroller = new CategoryController().router