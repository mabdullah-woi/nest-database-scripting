import { connectionSource } from '../config.database';

const runSeeds = async () => {
  const dataSource = await connectionSource.initialize();

  try {
    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Seeding failed.', error);
  } finally {
    await dataSource.destroy();
  }
};

runSeeds().catch((error) => console.error('Error running seeds:', error));
