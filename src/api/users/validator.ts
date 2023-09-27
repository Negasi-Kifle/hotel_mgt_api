import Joi from "joi";

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
