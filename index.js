'use strict';

require('./mixin');

const Hapi = require('@hapi/hapi');

const controller = require('./controller');

const init = async () => {
  const server = Hapi.server({
      port: 3001,
      host: 'localhost'
  });
  server.route([
    {
      method: 'GET',
      path: '/file/{name}',
      handler: controller.readFile,
    },
    {
      method: 'POST',
      path: '/file/{name}',
      handler: controller.writeFile,
    }
  ]);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
