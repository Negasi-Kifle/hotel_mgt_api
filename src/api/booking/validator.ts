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
  dep_time: Joi.date(),
  status: Joi.string()
    .valid("Pending", "Cancelled", "Arrived", "Departed")
    .messages({
      "any.only":
        "Status must be one of the following: Pending, Cancelled, Arrived, Departed",
    }),
});

// Validate update-api
export const validateUpdateAPI = Joi.object({
  first_name: Joi.string(),
  last_name: Joi.string(),
  id_num: Joi.string(),
  phone_num: Joi.string(),
  room_id: Joi.string(),
  arr_date: Joi.date(),
  arr_time: Joi.date(),
  dep_date: Joi.date(),
  dep_time: Joi.date(),
});

// Validate get-free-rooms api
export const validateFreeRoomsAPI = Joi.object({
  arr_date: Joi.date().required().messages({
    "any.required": "When will the client arrive?",
  }),
  dep_date: Joi.date().required().messages({
    "any.required": "When will the client depart?",
  }),
});

// Validate update-status api
export const validateStatusAPI = Joi.object({
  status: Joi.string()
    .valid("Pending", "Cancelled", "Arrived", "Departed")
    .required()
    .messages({
      "any.required": "Status is required",
      "string.empty": "Status can not be empty",
      "any.only":
        "Status must be one of the following: Pending, Cancelled, Arrived, Departed",
    }),
});
