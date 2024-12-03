import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
config();

export const getTypeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  url: configService.get<string>('PG_DATABASE_URL'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: configService.get<boolean>('TYPEORM_SYNC', false),
  migrationsRun: configService.get<boolean>('TYPEORM_MIGRATIONS_RUN', false),
  migrationsTableName: '_typeorm_migrations',
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  logging: configService.get<boolean>('TYPEORM_LOGGING', false),
});

export const connectionSource = new DataSource({
  type: 'postgres',
  url: process.env.PG_DATABASE_URL,
  schema: 'core',
  entities:
    process.env.NODE_ENV === 'production'
      ? ['dist/**/*.entity.js']
      : ['src/**/*.entity.ts'],
  migrations:
    process.env.NODE_ENV === 'production'
      ? ['dist/database/migrations/*.js']
      : ['src/database/migrations/*.ts'],
  migrationsTableName: '_typeorm_migrations',
  logging: process.env.TYPEORM_LOGGING === 'true',
} as DataSourceOptions);
