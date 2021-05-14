import request from 'supertest';

describe('Post Feature', () => {
  async function postFeature({
    email = 'someDefault@email.com',
    featureName = 'someDefaultFeature',
    enable = false,
  }) {
    const app = (await import('../../../app')).default;
    const postRequest = request(app)
      .post('/api/feature')
      .set('Accept', 'application/json');

    return postRequest.send({ email, featureName, enable });
  }

  function mockErrorPostFeature() {
    jest.mock('../../../helpers/featureData', () => ({
      upsert: () => {
        throw new Error('Internal Server Error');
      },
    }));
  }

  describe('when requested feature is not yet on the list', () => {
    let response;
    const expectedFeature = {
      email: 'someNewEmail@email.com',
      featureName: 'someNewFeature',
      enable: true,
    };

    beforeAll(async () => {
      jest.resetModules();

      response = await postFeature(expectedFeature);
    });

    it('should return 200 when post was successful', () => {
      expect(response.status).toEqual(200);
    });

    it('should add data on the list', async () => {
      const { featureList } = await import('../../../helpers/featureData');

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
      jest.resetModules();

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
      jest.resetModules();

      response = await postFeature(expectedFeature);
    });

    it('should return 200 when post was successful', () => {
      expect(response.status).toEqual(200);
    });

    it('should add data on the list', async () => {
      const { featureList } = await import('../../../helpers/featureData');
      const postedFeature = featureList.find(
        (feature) =>
          feature.featureName === expectedFeature.featureName &&
          feature.email === expectedFeature.email
      );
      expect(expectedFeature).toEqual(postedFeature);
    });
  });

  describe('when something went wrong during posting of data', () => {
    let response;

    const expectedFeature = {
      email: 'someEmail@email.com',
      featureName: 'someFeature',
      enable: false,
    };

    beforeAll(async () => {
      jest.resetModules();

      mockErrorPostFeature();
      response = await postFeature(expectedFeature);
    });

    it('should return 500 when an error occurs', () => {
      expect(response.status).toEqual(500);
    });

    it('should error message', () => {
      expect(response.body.message).toEqual('Internal Server Error');
    });
  });
});
