'use strict';

const service = require('./service');

function readFile(request) {
  return _fork(service.readFile(request.params.name));
}

function writeFile(request) {
  return _fork(service.writeFile(request.params.name, request.payload.data));
}

function _fork(future) {
  return future
    .toPromise()
    .then(r.prop('value'))
    .catch(error => {
      console.log(error.error.message, error.context);
      throw error.error;
    });
}

exports.readFile = readFile;
exports.writeFile = writeFile;
