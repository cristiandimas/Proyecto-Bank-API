const express = require('express');
const cors = require('cors');
const { usersRouter } = require('../routes/users.routes');
const { transfersRouter } = require('../routes/transfers.routes');
const morgan = require('morgan');
const { db } = require('../database/db');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;

    this.paths = {
      users: '/api/v1/users',
      transfers: '/api/v1/transfers',
    };
    this.database();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.paths.users, usersRouter);
    this.app.use(this.paths.transfers, transfersRouter);
  }
  database() {
    //nos autenticamos ante la base de datos, utilizando el objeto db del archivo db.js de la carpeta database
    db.authenticate()
      //authenticate nos devuelte una promesa, hacemos manejo de promesa con then y catch
      .then(() => console.log('Database authenticated'))
      .catch(err => console.log(err));
    //sincronizamos la bases de datos
    db.sync()
      //sync nos devuelve una promesa,  hacemos uso de then y catch para manejrar la promesa
      .then(() => console.log('Database Sync'))
      .catch(err => console.log('err'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

module.exports = Server;
