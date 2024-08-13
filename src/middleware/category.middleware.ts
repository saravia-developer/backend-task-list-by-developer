import { NextFunction, Request, Response } from "express";
import { ValidationError, validationResult } from "express-validator";

class CategoryMiddleware {

  validatorForm(req: Request, res: Response, next: NextFunction) {
    try{
      validationResult(req).throw();
      return next()
    } catch (error) {
      if(error instanceof Error && 'errors' in error) {
        const validatorErrors = (error as any).errors as ValidationError[];
        res.status(403)
        res.send({
          errors: validatorErrors.map(err => ({ message: err.msg }))
        })
      } else {
        res.status(500).send({ error: "Ocurrio un error inesperado" })
      }
    }
  }
}

export const categoryMiddleware = new CategoryMiddleware()