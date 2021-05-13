import Express from 'express';
import getFeature from './http/features/get';
import postFeature from './http/features/post';
import listFeature from './http/features/list';

const app = new Express();

app.use(Express.json());

app.get('/_healthcheck', (req, res) => {
  res.send('OK');
});
app.get('/api/feature', getFeature);
app.get('/api/feature/list', listFeature);
app.post('/api/feature', postFeature);

export default app;
