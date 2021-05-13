import { get } from '../../helpers/featureData';

export default async function getFeature(req, res) {
  const { email, featureName } = req.query;

  const feature = get({ email, featureName });

  if (!feature) {
    res.status(404).send({
      statusCode: 404,
      message: 'NOT_FOUND',
    });
  }

  return res.status(200).send(feature);
}
