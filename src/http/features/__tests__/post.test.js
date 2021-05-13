import request from 'supertest';
import app from '../../../app';
import { featureList } from '../../../helpers/featureData';

describe('Post Feature', () => {
  function postFeature({
    email = 'someDefault@email.com',
    featureName = 'someDefaultFeature',
    enable = false,
  }) {
    const getRequest = request(app)
      .post('/api/feature')
      .set('Accept', 'application/json');

    return getRequest.send({ email, featureName, enable });
  }

  beforeAll(() => {
    jest.resetModules();
  });

  describe('when requested feature is not yet on the list', () => {
    let response;
    const expectedFeature = {
      email: 'someNewEmail@email.com',
      featureName: 'someNewFeature',
      enable: true,
    };

    beforeAll(async () => {
      response = await postFeature(expectedFeature);
    });

    it('should return 200 when post was successful', () => {
      expect(response.status).toEqual(200);
    });

    it('should add data on the list', () => {
      const postedFeature = featureList.find(
        (feature) =>
          feature.featureName === expectedFeature.featureName &&
          feature.email === expectedFeature.email
      );

      expect(expectedFeature).toEqual(postedFeature);
    });
  });

  describe('when requested feature is already on the list', () => {
    let response;
    const expectedFeature = {
      email: 'someNewEmailAgain@email.com',
      featureName: 'someNewFeatureAgain',
      enable: true,
    };

    beforeAll(async () => {
      await postFeature(expectedFeature);
      response = await postFeature(expectedFeature);
    });

    it('should return 304 when post was successful', () => {
      expect(response.status).toEqual(304);
    });
  });

  describe('when requested feature is on the list with different value', () => {
    let response;
    const expectedFeature = {
      email: 'someEmail@email.com',
      featureName: 'someFeature',
      enable: false,
    };

    beforeAll(async () => {
      response = await postFeature(expectedFeature);
    });

    it('should return 200 when post was successful', () => {
      expect(response.status).toEqual(200);
    });

    it('should add data on the list', () => {
      const postedFeature = featureList.find(
        (feature) =>
          feature.featureName === expectedFeature.featureName &&
          feature.email === expectedFeature.email
      );
      expect(expectedFeature).toEqual(postedFeature);
    });
  });
});
