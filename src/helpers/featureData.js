// eslint-disable-next-line import/no-mutable-exports
export const featureList = [
  { featureName: 'someFeature', email: 'someEmail@email.com', enable: true },
];

export function get({ email, featureName }) {
  return featureList.find(
    (feature) => feature.featureName === featureName && feature.email === email
  );
}

export function upsert({ email, featureName, enable }) {
  const matchedIndex = featureList.findIndex(
    (feature) => feature.featureName === featureName && feature.email === email
  );

  if (matchedIndex < 0) {
    featureList.push({ email, featureName, enable });

    return true;
  }

  const feature = featureList[matchedIndex];
  const hasUpdates = feature.enable !== enable;

  if (hasUpdates) {
    feature.enable = enable;
  }

  return hasUpdates;
}

export function list() {
  return featureList;
}
