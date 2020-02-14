const Hapi = require('@hapi/hapi');

require('./mixin');

const service = require('./service');


const init = async () => {
  const server = Hapi.server({
      port: 3001,
      host: 'localhost'
  });
  server.route({
    method: 'GET',
    path: '/test1',
    handler: service.test1,
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
