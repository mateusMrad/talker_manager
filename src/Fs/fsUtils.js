const fs = require('fs/promises');

async function reading(path) {
  const read = await fs.readFile(path);
  const data = JSON.parse(read);

  return data;
}

module.exports = reading;