import request from 'supertest';
import app from '../../../app';

describe('Get Feature', () => {
  function getFeature({ email, featureName }) {
    const getRequest = request(app)
      .get('/api/feature')
      .set('Accept', 'application/json');

    return getRequest.query({ email, featureName }).send();
  }

  describe('when there is no match for any feature', () => {
    let response;

    beforeAll(async () => {
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
});
