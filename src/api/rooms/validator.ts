import Joi, { string } from "joi";

// Validate the create-api
export const validateCreateAPI = Joi.object({
  room_id: Joi.string().required().messages({
    "any.required": "Please provide room name or number.",
  }),
  room_size: Joi.string(),
  room_price: Joi.number(),
  room_floor: Joi.string(),
  room_status: Joi.string().valid("OCC", "VD", "VR", "OOO", "VC").messages({
    "any.only": "Room status must be one of the following: OCC, VD, VR, OOO VC",
  }),
});
