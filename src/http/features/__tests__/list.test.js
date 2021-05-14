import request from 'supertest';

describe('List Feature', () => {
  async function listFeatures() {
    const app = (await import('../../../app')).default;
    const listRequest = request(app)
      .get('/api/feature/list')
      .set('Accept', 'application/json');

    return listRequest.send();
  }

  function mockErrorListFeature() {
    jest.mock('../../../helpers/featureData', () => ({
      list: () => {
        throw new Error('Internal Server Error');
      },
    }));
  }

  describe('when successful', () => {
    let response;

    beforeAll(async () => {
      jest.resetModules();

      response = await listFeatures();
    });

    it('should return 200 when returning a list', () => {
      expect(response.status).toEqual(200);
    });

    it('should return list of features', () => {
      expect(response.body).toEqual([
        {
          featureName: 'someFeature',
          email: 'someEmail@email.com',
          enable: true,
        },
      ]);
    });
  });

  describe('when something went wrong data retrieval', () => {
    let response;

    beforeAll(async () => {
      jest.resetModules();

      mockErrorListFeature();
      response = await listFeatures();
    });

    it('should return 500 when an error occurs', () => {
      expect(response.status).toEqual(500);
    });

    it('should error message', () => {
      expect(response.body.message).toEqual('Internal Server Error');
    });
  });
});
