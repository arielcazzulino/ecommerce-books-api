import express from 'express';
import routes from './Routes/indexRoutes.js';
import morgan from 'morgan';

const server = express();
server.use('/', routes);
server.use(morgan('dev'));

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
  });

export default server;