import 'reflect-metadata';
import 'dotenv/config';
import { errors as celebrateErrors } from 'celebrate';
import express, { Express } from 'express';
import cors from 'cors';
import 'express-async-errors';
import path from 'path';

import handleAppError from '@shared/infra/http/middlewares/handleAppError';
import routes from '@shared/infra/http/routes';

import '@shared/container';
import '@shared/infra/typeorm';

class App {
  public server: Express;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.errors();
  }

  middlewares(): void {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      '/uploads',
      express.static(
        path.resolve(__dirname, '..', '..', '..', '..', 'uploads'),
      ),
    );
  }

  routes(): void {
    this.server.use(routes);
  }

  errors(): void {
    this.server.use(celebrateErrors());
    this.server.use(handleAppError);
  }
}

export default new App().server;
