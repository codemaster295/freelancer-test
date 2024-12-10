const fastify = require('fastify')({ logger: true });
const userRoutes = require('./routes/user.routes'); // Adjust the path as necessary
const initializeDatabase = require('./utils/db-init');

fastify.register(userRoutes,{ prefix: '/api' });

const start = async () => {
    try {
        await fastify.listen({ port: 6776, host: '0.0.0.0' });
        await initializeDatabase();
        fastify.log.info(`Server listening on port 6776`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
