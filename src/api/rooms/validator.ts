import Joi, { string } from "joi";

// Validate the create-api
export const validateCreateAPI = Joi.object({
  room_id: Joi.string().required().messages({
    "any.required": "Please provide room number.",
    "string.empty": "Room number is required",
  }),
  room_type: Joi.string().messages({
    "string.empty": "Room type is required",
  }),
  room_price: Joi.number().messages({
    "string.empty": "Room price is required",
  }),
  room_floor: Joi.string().messages({
    "string.empty": "Room floor is required",
  }),
  room_status: Joi.string().valid("OCC", "VD", "VR", "OOO", "VC").messages({
    "any.only": "Room status must be one of the following: OCC, VD, VR, OOO VC",
  }),
});

// Validate update-api
export const validateUpdateAPI = Joi.object({
  room_id: Joi.string().messages({
    "any.required": "Please provide room number.",
  }),
  room_type: Joi.string(),
  room_price: Joi.number(),
  room_floor: Joi.string(),
});

// Update room status
export const validateUpdateStatusAPI = Joi.object({
  room_status: Joi.string()
    .valid("OCC", "VD", "VR", "OOO", "VC")
    .required()
    .messages({
      "any.only":
        "Room status must be one of the following: OCC, VD, VR, OOO VC",
      "any.required": "Rooms status is required",
    }),
});
