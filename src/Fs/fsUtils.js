const fs = require('fs/promises');

async function reading(path) {
  const read = await fs.readFile(path);
  const data = JSON.parse(read);

  return data;
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

module.exports = {
  reading,
  randomToken,
};