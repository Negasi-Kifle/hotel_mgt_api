import Joi from "joi";

// Validate the create-api
export const validateCreateAPI = Joi.object({
  house_keeper: Joi.string().required().messages({
    "any.required": "Housekeeper is required",
  }),
  job: Joi.string().required().messages({
    "any.required": "Job descrption is required",
  }),
  date: Joi.date().required().messages({
    "any.required": "Date of the job is required",
  }),
});

// Validate the update-api
export const validateUpdateAPI = Joi.object({
  job: Joi.string(),
  date: Joi.date(),
});
