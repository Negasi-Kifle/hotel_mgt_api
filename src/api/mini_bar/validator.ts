import Joi from "joi";

// Validate the API that's for creating a minibar task
export const validateCreateAPI = Joi.object({
  employee: Joi.string().required().messages({
    "any.required": "Please assign an employee to do the minibar task",
    "string.empty": "Please assign an employee to do the minibar task",
  }),
  rooms_minibar: Joi.array()
    .min(1)
    .items(
      Joi.object({
        room: Joi.string().required().messages({
          "any.required": "Please select at least one room",
          "string.empty": "Please select at least one room",
        }),
      })
    )
    .required()
    .messages({
      "any.required": "Please select at least one room for the minibar task",
      "array.min": "Please select at least one room for the minibar task",
    }),
  task_date: Joi.date().min("now").required().messages({
    "any.required": "Please select task date",
    "date.empty": "Please select task date",
    "date.min": "Task date can not be in the past",
  }),
});

// Validate the API that's for updating a minibar
export const validateUpdateAPI = Joi.object({
  employee: Joi.string().messages({
    "string.empty": "Please assign an employee to do the minibar task",
  }),
  rooms_minibar: Joi.array()
    .min(1)
    .items(
      Joi.object({
        room: Joi.string().required().messages({
          "any.required": "Please select at least one room",
          "string.empty": "Please select at least one room",
        }),
        status: Joi.string().valid("Done", "Pending").messages({
          "any.only": "Status must be either Pending or Done",
        }),
      })
    )
    .messages({
      "array.min": "Please select at least one room for the minibar task",
    }),
  task_date: Joi.date().min("now").messages({
    "date.empty": "Please select task date",
    "date.min": "Task date can not be in the past",
  }),
});
