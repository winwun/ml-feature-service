import { list } from '../../helpers/featureData';

export default async function getFeature(req, res) {
  return res.status(200).send(list());
}
