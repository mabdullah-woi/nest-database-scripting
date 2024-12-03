import { DataSource } from 'typeorm';

const tableName = 'tasks';

export enum SeedTasksIds {
  TASK_ONE = '0feeabaf-bd84-4400-a822-570c07a50bd1',
  TASK_TWO = '0fcbd41d-fc64-4804-b557-dcba545fb4b2',
}

export const seedTasks = async (datasource: DataSource, schemaName: string) => {
  const qb = datasource.createQueryBuilder();

  await qb
    .insert()
    .into(`${schemaName}.${tableName}`)
    .values([
      {
        id: SeedTasksIds.TASK_ONE,
        title: 'Configure Authentication',
        content: 'Set up JWT authentication for the codebase',
      },
      {
        id: SeedTasksIds.TASK_TWO,
        title: 'Review PR',
        content: 'Test the code, review the changes, and approve the PR.',
      },
    ])
    .execute();
};
