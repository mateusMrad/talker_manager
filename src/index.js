const express = require('express');
const reading = require('./Fs/fsUtils');
const { path } = require('express/lib/application');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';
const PATH = 'src/talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const data = await reading(PATH);
  res.status(200).json(data);
});

app.listen(PORT, () => {
  console.log('Online');
});
