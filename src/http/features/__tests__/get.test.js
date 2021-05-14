import request from 'supertest';

describe('Get Feature', () => {
  async function getFeature({ email, featureName }) {
    const app = (await import('../../../app')).default;
    const getRequest = request(app)
      .get('/api/feature')
      .set('Accept', 'application/json');

    return getRequest.query({ email, featureName }).send();
  }

  function mockErrorGetFeature() {
    jest.mock('../../../helpers/featureData', () => ({
      get: () => {
        throw new Error('Internal Server Error');
      },
    }));
  }

  describe('when there is no match for any feature', () => {
    let response;

    beforeAll(async () => {
      jest.resetModules();

      response = await getFeature({
        email: 'someNewEmail@email.com',
        featureName: 'someNewFeature',
      });
    });

    it('should return 404 when no feature is found', () => {
      expect(response.status).toEqual(404);
    });
  });

  describe('when the email and feature have a match', () => {
    let response;

    beforeAll(async () => {
      jest.resetModules();

      response = await getFeature({
        email: 'someEmail@email.com',
        featureName: 'someFeature',
      });
    });

    it('should return 200 when a feature is found', () => {
      expect(response.status).toEqual(200);
    });

    it('should return canAccess field', () => {
      expect(response.body).toEqual({ canAccess: true });
    });
  });

  describe('when something went wrong data retrieval', () => {
    let response;

    beforeAll(async () => {
      jest.resetModules();

      mockErrorGetFeature();
      response = await getFeature({
        email: 'someEmail@email.com',
        featureName: 'someFeature',
      });
    });

    it('should return 500 when an error occurs', () => {
      expect(response.status).toEqual(500);
    });

    it('should error message', () => {
      expect(response.body.message).toEqual('Internal Server Error');
    });
  });
});
