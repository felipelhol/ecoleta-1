import { celebrate, Joi, Segments } from 'celebrate';

export default celebrate(
  {
    [Segments.QUERY]: Joi.object().keys({
      city: Joi.string().required(),
      uf: Joi.string().length(2).required(),
      items: Joi.string().required(),
    }),
  },
  { abortEarly: false },
);
