const fs = require('fs/promises');
const path = require('path');

const PATH = path.resolve(__dirname, '../talker.json');

async function reading() {
  const read = await fs.readFile(PATH);
  const data = JSON.parse(read);

  return data;
}

async function readingById(id) {
  const read = await reading();
  const find = read.find((talker) => talker.id === Number(id));
  return find;
}

function randomToken() {
  let token = '';
  const elements = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const elementsSize = elements.length;
  for (let index = 0; index < 16; index += 1) {
    token += elements.charAt(Math.floor(Math.random() * elementsSize));
  }
  return token;
}

async function newAdd(talker) {
  const { name, age, talk } = talker;
  const { watchedAt, rate } = talk;
  const getTalkers = await reading();
  const id = getTalkers.length + 1;
  const addTalker = { id, name, age, talk: { watchedAt, rate } };
  const newTalkersList = JSON.stringify([...getTalkers, addTalker]);
  await fs.writeFile(PATH, newTalkersList);
  return addTalker;
}

async function update(talker, id) {
  const getTalkers = await reading();
  const idTalkers = await readingById(id);
  const { name, age, talk } = talker;
  if (idTalkers === undefined) {
    throw new Error('Pessoa palestrante não encontrada');
  } else {
    const filter = getTalkers.filter((palestrante) => palestrante.id !== id);
    const newTalker = { id, name, age, talk };
    const newList = JSON.stringify([...filter, newTalker]);
    await fs.writeFile(PATH, newList);
    return newTalker;
  }
}

module.exports = {
  reading,
  readingById,
  randomToken,
  newAdd,
  update,
};