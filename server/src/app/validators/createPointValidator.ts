import { celebrate, Joi, Segments } from 'celebrate';

export default celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
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
