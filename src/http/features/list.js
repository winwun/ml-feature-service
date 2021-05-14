import { list } from '../../helpers/featureData';

export default async function getFeature(req, res) {
  try {
    return res.status(200).send(list());
  } catch (ex) {
    console.log('ex', ex); // eslint-disable-line no-console

    return res.status(500).send({ message: 'Internal Server Error' });
  }
}
