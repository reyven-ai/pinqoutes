import express, { Response, NextFunction } from 'express';
import { json } from 'body-parser';
import authRoutes from './modules/auth/auth.route';
import profileRoutes from './modules/profile/profile.route';
import pinRoutes from './modules/pin/pin.route';
import usersRoute from './modules/users/users.route';
import * as dotenv from 'dotenv';
import pool from './database/db';
import knex from 'knex';
import knexConfig from './database/knexfile';

dotenv.config();

import cors = require('cors');

const PORT = 3000;

const app = express();

app.use(json());
app.use(cors());

// validate database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Database connected');
  }
});

// run knex migrations
const knexInstance = knex(knexConfig.development);
knexInstance.migrate.latest().then(() => {
  console.log('Knex migrations ran');
});

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/pins', pinRoutes);
app.use('/users', usersRoute);
app.use(
  (err: Error, req: express.Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
  }
);

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
