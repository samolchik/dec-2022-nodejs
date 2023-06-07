import Joi from "joi";

import { regexConstants } from "../constants/regex.constants";
import { EGenders } from "../enums/user.enum";

export class UserValidator {
  static create = Joi.object({
    firstName: Joi.string().min(3).max(30).trim(),
    age: Joi.number().min(1).max(199),
    gender: Joi.valid(EGenders),
    email: Joi.string().regex(regexConstants.EMAIL).lowercase().trim(),
    password: Joi.string().regex(regexConstants.PASSWORD).trim(),
  });

  static update = Joi.object({
    firstName: Joi.string().min(3).max(30).trim(),
    age: Joi.number().min(1).max(199),
    gender: Joi.valid(EGenders),
  });
}
