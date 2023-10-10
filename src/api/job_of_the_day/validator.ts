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

// Validate the api that updates "is_done"
export const validateIsDone = Joi.object({
  time_finished: Joi.date().required().messages({
    "any.required": "The time at which the job is finished is required",
  }),
  rooms_cleaned: Joi.number().required().messages({
    "any.required": "Number of rooms cleaned is required",
  }),
  trol_and_chem_basket: Joi.boolean(),
  corrider_cleaned: Joi.boolean(),
});
