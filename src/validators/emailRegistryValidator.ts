import Joi from 'joi';
import {
  emailSchema,
  phoneSchema, stringSchema
} from './schemas';

const createEmailRegistry = Joi.object({
  name: stringSchema.required().label('Name'),
  email: emailSchema.required().label('E-mail'),
  phoneNumber: phoneSchema.label('Phone Number').allow(null, ''),
  description: stringSchema.label('Description'),
});

const updateEmailRegistry = Joi.object({
  name: stringSchema.label('Name').allow(null, ''),
  email: emailSchema.label('E-mail').allow(null, ''),
  phoneNumber: phoneSchema
    .allow(null, '')
    .label('Phone Number')
    .allow(null, ''),
  description: stringSchema.label('Description').allow(null, ''),
});

export { createEmailRegistry, updateEmailRegistry };
