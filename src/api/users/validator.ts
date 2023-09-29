import Joi from "joi";

// Validate the createUser api
export const validateCreateUserAPI = Joi.object({
  first_name: Joi.string().required().messages({
    "any.required": "User's first name is required",
  }),
  last_name: Joi.string().required().messages({
    "any.required": "User's last name is required",
  }),
  email: Joi.string().email(),
  phone_number: Joi.string().required().messages({
    "any.required": "User's phone number is required",
  }),
  role: Joi.string()
    .valid("Supervisor", "House-Keeper", "Receptionist", "Super-Admin")
    .required()
    .messages({
      "any.required": "User role is required",
    }),
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
  new_pswd: Joi.string().required().messages({
    "any.required": "New password is required",
  }),

  default_pswd: Joi.string().required().messages({
    "any.required": "Default password is required",
  }),
});

// Validate user status api
export const validateStatusAPI = Joi.object({
  user_id: Joi.string().required(),
  status: Joi.string().valid("Active", "Inactive").required(),
});

// Validate api that's for updating personal info
export const validatePersonalInfoAPI = Joi.object({
  first_name: Joi.string(),
  last_name: Joi.string(),
  phone_number: Joi.string(),
  email: Joi.string(),
});

// Validate api that's for changing password
export const validateChangePswdAPI = Joi.object({
  current_pswd: Joi.string().required(),
  new_pswd: Joi.string().required(),
});
