const express = require('express');
const { reading, randomToken } = require('./Fs/fsUtils');

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

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const read = await reading(PATH);

  const search = read.find((talker) => talker.id === Number(id));
  if (search === undefined) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(search);
});

app.post('/login', async (_req, res) => {
  const token = randomToken();
  res.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
