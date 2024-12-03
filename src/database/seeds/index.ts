import { connectionSource } from '../config.database';
import { seedTasks } from './tasks.seed';

const runSeeds = async () => {
  const dataSource = await connectionSource.initialize();
  const schemaName = 'core';

  try {
    await seedTasks(dataSource, schemaName);
    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Seeding failed.', error);
  } finally {
    await dataSource.destroy();
  }
};

runSeeds().catch((error) => console.error('Error running seeds:', error));
