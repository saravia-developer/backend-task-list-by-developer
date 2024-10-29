import { check, Meta, ValidationChain } from "express-validator";

class TaskValidators {
  validate: ValidationChain[]
  
  constructor() {
    this.validate = [
      check("nameTask")
        .isString().withMessage("El campo 'nameTask' tiene que ser un texto")
        .notEmpty().withMessage("El campo 'nameTask' no tiene un valor, tiene que asignarselo")
        .isLength({ min: 2, max: 60 }).withMessage((_, meta: Meta) => {
          return `El título 'nameTask' tiene que tener un mínimo de caracteres de 2 y máximo de 60, error localizado en el ${meta.location}`;
        }),

      check("description")
        .isString()
        .withMessage("El campo 'description' tiene que ser un texto"),

      check("estimatedTime")
        .isNumeric()
        .withMessage("El campo 'estimatedTime' tiene que ser un número")
        .notEmpty()
        .withMessage("El campo 'estimatedTime' tiene que tener un valor"),

      check("isCompleted")
        .isBoolean()
        .withMessage("El campo 'isCompleted' tiene que tener un valor entre 'true' o 'false'"),

      check("category")
        .isNumeric()
        .withMessage(
          "El campo 'category' tiene que entregarle al sistema un número, el valor de la opción no es de tipo númerico"
        )
        .notEmpty()
        .withMessage("El campo 'category' no esta entregando ningun valor"),
    ];
  }
}

export const taskvalidator = new TaskValidators().validate
