import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();
const configService = new ConfigService();

export const connectionSource = new DataSource({
  type: 'postgres',
  logging: false,
  url: configService.get<string>('PG_DATABASE_URL'),
});

export const performQuery = async (
  query: string,
  consoleDescription: string,
  withLog = true,
  ignoreAlreadyExistsError = false,
) => {
  try {
    const result = await connectionSource.query(query);

    if (withLog) console.log(`Performed '${consoleDescription}' successfully`);

    return result;
  } catch (err) {
    let message = '';

    if (ignoreAlreadyExistsError && `${err}`.includes('already exists')) {
      message = `Performed '${consoleDescription}' successfully`;
    } else {
      message = `Failed to perform '${consoleDescription}': ${err}`;
    }

    if (withLog) console.error(message);
  }
};
