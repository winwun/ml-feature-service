import Express from 'express';

const app = new Express();

app.use(Express.json());

app.get('/_healthcheck', (req, res) => {
  res.send('OK');
});

export default app;
