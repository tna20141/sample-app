const f = require('fluture');
const r = require('ramda');

const forkl = f.fork(console.log)(console.log);

let after = f.after(1000)(1000);
let add = f.map(num => num + 10);

const fl1 = () => f.after(100)(1);
const fl2 = num => f.after(200)(2+num);
const fl3 = res => f.after(100)(res + 3);
const fl4 = res => f.after(100)(res + 4);

const promise = num => Promise.resolve(num-1);

const flrej = () => f.rejectAfter(2000)('rejected');

const mergeContext = r.merge;

const log = f.chain(res => {
  console.log(res);
  return f.resolve(res);
});

const wrapl = (func, context) => ({ res, resContext }) =>
  func(res)
    .pipe(f.chain(res2 => f.resolve({ res: res2, resContext: mergeContext(resContext, context) })))
    .pipe(f.chainRej(error => f.reject({ error, resContext })));

const newl = wrapl;

const chainl = func => ({ result, context }) =>
  func(result)
    .pipe(f.chain({ result: result2, context: context2 } =>
      f.resolve({ result: result2, context: mergeContext(context, context2) })
    ));

const markl = context => f.chain(wrapl(f.resolve, context));

// forkl(wrapl(fl1, { a: 'fl1' })({}).pipe(f.chain(wrapl(fl2, { b: 'fl2' }))));

const encaseP = f.encaseP;

const newFuture = func => f((reject, resolve) => {
  func(resolve, reject);
  return () => {};
})
  .pipe(f.chain(result => f.resolve({ result })))
  .pipe(f.chainRej(error => f.reject({ error })));

const newFutureFunc = num => newFuture((resolve, reject) => {
  setTimeout(() => {
    console.log(num);
    resolve(num * 2);
  }, 1000);
});

// const fin = r.pipe(
//   newl(fl1),
//   markl({ a: 1, b: 2 }),
//   chainl(fl2),
//   markl({ a: 2 }),
//   chainl(fl3),
//   chainl(encaseP(promise)),
//   chainl(newFutureFunc),
//   log,
//   chainl(fl4)
//   // chainl(flrej)
// )({});

// forkl(fin);


// const t = f.reject(1)
const t = f.reject(1)
  .pipe(f.chain(a => {
    console.log(a);
    return f.resolve(a);
  }))
  .pipe(f.chainRej(a => {
    console.log('z');
    return f.reject(a);
  }))
  .pipe(f.chain(a => {
    console.log('aa');
    return f.resolve(a);
  }))
  .pipe(f.chainRej(a => {
    console.log('down');
    return f.reject(a);
  }))

forkl(t);

global.r = r;
global.f = f;
global.compose = r.compose;
global.encaseP = encaseP;
global.newFuture = newFuture;
