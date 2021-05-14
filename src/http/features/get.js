import { get } from '../../helpers/featureData';

export default async function getFeature(req, res) {
  const { email, featureName } = req.query;

  try {
    const feature = get({ email, featureName });

    if (!feature) {
      return res.status(404).send({
        statusCode: 404,
        message: 'NOT_FOUND',
      });
    }

    return res.status(200).send({ canAccess: feature.enable });
  } catch (ex) {
    console.log('ex', ex); // eslint-disable-line no-console

    return res.status(500).send({ message: 'Internal Server Error' });
  }
}
