const express = require('express');
const { reading, randomToken, newAdd } = require('./Fs/fsUtils');
const validMail = require('./Middlewares/emailMid');
const validPassword = require('./Middlewares/passwordMid');
const validAge = require('./Middlewares/ageMid');
const validName = require('./Middlewares/nameMid');
const { validTalk, validRate } = require('./Middlewares/talkMid');
const validToken = require('./Middlewares/tokenMid');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const data = await reading();
  res.status(200).json(data);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const read = await reading();

  const search = read.find((talker) => talker.id === Number(id));
  if (search === undefined) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(search);
});

app.post('/login', validMail, validPassword, async (_req, res) => {
  const token = randomToken();
  res.status(200).json({ token });
});

app.post('/talker',
  validToken,
  validName,
  validAge,
  validTalk,
  validRate, async (req, res) => {
    const human = req.body;
    const newHuman = await newAdd(human);
    res.status(201).json(newHuman);
  });

app.listen(PORT, () => {
  console.log('Online');
});
