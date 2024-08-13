import { check, ValidationChain } from "express-validator";

class CategoryValidators {
  validate: ValidationChain[]

  constructor() {
    this.validate = [
      check("nameCategory")
        .isString().withMessage("El campo 'nameCategory' tiene que ser un texto")
        .notEmpty().withMessage("El campo 'nameCategory' no puede estar vacío")
        .isLength({ min: 2, max: 30 }).withMessage("El campo 'nameCategory' tiene que tener un mínimo de caracteres de 2 y un máximo de 30")
    ]
  }
}

export const categoryvalidators = new CategoryValidators().validate