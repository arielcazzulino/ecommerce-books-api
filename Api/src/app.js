import express from 'express';
import routes from './Routes/indexRoutes.js';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const server = express();

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
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