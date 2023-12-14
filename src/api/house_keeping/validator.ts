import Joi from "joi";

// Validate create-api
export const validateHousekeeperTaskAPI = Joi.object({
  house_keeper: Joi.string().required().messages({
    "any.required": "Please select house keeper",
  }),
  task_date: Joi.string().required().messages({
    "any.required": "Task date is required",
  }),
  rooms_task: Joi.array()
    .items(
      Joi.object({
        room: Joi.string().required().messages({
          "any.required": "Please select at least one room",
        }),
        task: Joi.string().valid("Clean", "Full").required().messages({
          "any.required": "Please select task",
          "any.only": "Task must be either Clean or Full",
        }),
      })
    )
    .required()
    .messages({
      "any.required":
        "Please provide a list of rooms and their associated tasks",
    }),
});

// Validate create-api
export const validateSupervisorTaskAPI = Joi.object({
  supervisor: Joi.string().required().messages({
    "any.required": "Please assign supervisor",
  }),
  task_date: Joi.string().required().messages({
    "any.required": "Task date is required",
  }),
  rooms_task: Joi.array()
    .items(
      Joi.object({
        room: Joi.string().required().messages({
          "any.required": "Please select at least one room",
        }),
        task: Joi.string().valid("Clean", "Full").required().messages({
          "any.required": "Please select task",
          "any.only": "Task must be either Clean or Full",
        }),
      })
    )
    .required()
    .messages({
      "any.required":
        "Please provide a list of rooms and their associated tasks",
    }),
});

// Validate create-api
export const validateSupervisorTaskAPI2 = Joi.object({
  supervisor: Joi.string().required().messages({
    "any.required": "Please assign supervisor",
  }),
  hks_and_room_tasks: Joi.array()
    .items(
      Joi.object({
        hk_id: Joi.string().required().messages({
          "any.required": "Please select the housekeeping task",
        }),
        room_task_id: Joi.string().required().messages({
          "any.required": "Please select room task",
        }),
      })
    )
    .required()
    .messages({
      "any.required":
        "Please provide a list of rooms and their associated tasks",
    }),
});

// Validate get-by-housekeeper-and-date
export const validateGetByHKAndDate = Joi.object({
  task_date: Joi.date().required().messages({
    "any.required": "Please select task date",
  }),
});

// Validate the is_cleaned API
export const validateIsCleaned = Joi.object({
  room: Joi.string().required().messages({
    "any.required": "Please select room",
  }),
  is_cleaned: Joi.boolean().required().messages({
    "any.required": "Cleaness status is required",
  }),
  linens_used: Joi.array().items(
    Joi.object({
      linen_type: Joi.string().required().messages({
        "any.required": "Linen type is required",
      }),
      amount: Joi.number().required().messages({
        "any.required": "Amount of linens consumed is required",
      }),
    })
  ),
});

// Validate the is_approved api
export const validateIsApproved = Joi.object({
  room: Joi.string().required().messages({
    "any.required": "Please select room",
  }),
  is_approved: Joi.boolean().required().messages({
    "any.required": "Approval status is required",
  }),
});

// Validate the api to update housekeeping task
// Validate create-api
export const validateUpdateAPI = Joi.object({
  house_keeper: Joi.string(),
  supervisor: Joi.string(),
  task_date: Joi.string().required().messages({
    "any.required": "Task date is required",
  }),
  rooms_task: Joi.array()
    .items(
      Joi.object({
        room: Joi.string().required().messages({
          "any.required": "Please select at least one room",
        }),
        task: Joi.string().valid("Clean", "Full").required().messages({
          "any.required": "Please select task",
          "any.only": "Task must be either Clean or Full",
        }),
      })
    )
    .required()
    .messages({
      "any.required":
        "Please provide a list of rooms and their associated tasks",
    }),
}).or("house_keeper", "supervisor");
