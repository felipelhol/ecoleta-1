import { celebrate, Joi } from 'celebrate';

export default celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      whatsapp: Joi.string().required(),
      latitude: Joi.string().required(),
      longitude: Joi.string().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().length(2),
      items: Joi.string().required(),
    }),
  },
  { abortEarly: false },
);
