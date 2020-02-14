const fs = require('fs');

require('./mixin');

const _readFile = filename => new Promise((resolve, reject) => {
  fs.readFile(filename, (error, response) => {
    if (error) {
      return reject(error);
    }
    return resolve(response.toString('utf8'));
  });
});

const readFile = encaseP(_readFile);

const writeFile = (filename, str) => newFuture((resolve, reject) => {
  fs.writeFile(filename, str, (error) => {
    if (error) {
      return reject(error);
    }
    return resolve();
  })
});

const forkl = f.fork(e => {
  console.log('we have an error');
  console.error(e);
})(console.log);

forkl(writeFile('aa/aa.txt', 'bb');
