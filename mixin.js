const Future = require('future');
const r = require('ramda');

const compose = r.compose;

global.Future = Future;
global.r = r;
global.compose = compose;
