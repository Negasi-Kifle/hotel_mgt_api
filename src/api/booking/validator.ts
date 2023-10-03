import Joi from "joi";

// Validate create-api
export const validateCreateAPI = Joi.object({
  first_name: Joi.string().required().messages({
    "any.required": "First name of client is required",
  }),
  last_name: Joi.string().required().messages({
    "any.required": "Last name of client is required",
  }),
  id_num: Joi.string().required().messages({
    "any.required": "Id number of the client is required",
  }),
  phone_num: Joi.string(),
  room_id: Joi.string().required().messages({
    "any.required": "Room number is required",
  }),
  arr_date: Joi.date().required().messages({
    "any.required": "Arrival date is required",
  }),
  arr_time: Joi.date(),
  dep_date: Joi.date().required().messages({
    "any.required": "Departure date is required",
  }),
  status: Joi.string().valid("Pending", "Checked-In", "Checked-Out").messages({
    "any.only":
      "Status must be one of the following: Pending, Checked-In, Checked-Out",
  }),
});
