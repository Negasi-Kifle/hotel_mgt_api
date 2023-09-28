import Joi, { string } from "joi";

// Validate the createUser api
export const validateCreateUserAPI = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email(),
  phone_number: Joi.string().required(),
  role: Joi.string()
    .valid("Supervisor", "House-Keeper", "Receptionist", "Super-Admin")
    .required(),
});

// Validate login api
export const validateLoginAPI = Joi.object({
  email_or_phone: Joi.string().required().messages({
    "any.required": "Email or phone number is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});

// Validate the "changeDefaultPswd" api
export const validateChangeDefPswdAPI = Joi.object({
  new_pswd: Joi.string().required(),
});
