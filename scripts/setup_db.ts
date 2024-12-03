import { connectionSource, performQuery } from './utils';

connectionSource
  .initialize()
  .then(async () => {
    await performQuery(
      'CREATE SCHEMA IF NOT EXISTS "core"',
      'create schema "core"',
    );
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
