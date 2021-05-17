import Joi from '@hapi/joi';
import { upsert } from '../../helpers/featureData';

const schema = Joi.object({
  email: Joi.string().email().required(),
  featureName: Joi.string().required(),
  enable: Joi.boolean().required(),
});

export default async function postFeature(req, res) {
  try {
    const { error, value: body } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).send({ message: 'validation error' });
    }

    const hasUpdates = upsert(body);

    if (hasUpdates) {
      return res.status(200).send();
    }

    return res.status(304).send();
  } catch (ex) {
    console.log('ex', ex); // eslint-disable-line no-console

    return res.status(500).send({ message: 'Internal Server Error' });
  }
}
