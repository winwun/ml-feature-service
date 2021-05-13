import request from 'supertest';
import app from '../../../app';

describe('List Feature', () => {
  let response;

  function getFeature() {
    const getRequest = request(app)
      .get('/api/feature/list')
      .set('Accept', 'application/json');

    return getRequest.send();
  }

  beforeAll(async () => {
    response = await getFeature();
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
