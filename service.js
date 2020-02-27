const fs = require('fs');

const dir = 'public/files/';

const _readFile = filename => new Promise((resolve, reject) => {
  fs.readFile(`${dir}${filename}`, (error, response) => {
    if (error) {
      return reject(error);
    }
    return resolve(response.toString('utf8'));
  });
});

const readFile = Future.encaseP(_readFile);

const writeFile = (filename, str) =>
  Future.resolve()
    .tag('write start')
    .then(() => new Future((resolve, reject) => {
      fs.writeFile(`${dir}${filename}`, str, (error) => {
        if (error) {
          return reject(error);
        }
        return resolve();
      })
    }));

exports.readFile = readFile;
exports.writeFile = writeFile;
