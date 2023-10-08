import Joi from "joi";

// Validate the create-api
export const validateCreateAPI = Joi.object({
  linen_type: Joi.string().required().messages({
    "any.required": "Linen type/name is required",
  }),
  color_code: Joi.string().required().messages({
    "any.required": "Color code is required",
  }),
});
