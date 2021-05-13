import { upsert } from '../../helpers/featureData';

export default async function postFeature(req, res) {
  const { email, featureName, enable } = req.body;
  const hasUpdates = upsert({ email, featureName, enable });

  if (hasUpdates) {
    return res.status(200).send();
  }

  return res.status(304).send();
}
