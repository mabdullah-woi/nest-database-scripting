import { MigrationInterface, QueryRunner } from 'typeorm';

export class Tasks1733199006761 implements MigrationInterface {
  name = 'Tasks1733199006761';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "core"."tasks" ("id" uuid NOT NULL, "title" character varying NOT NULL, "content" text NOT NULL, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "core"."tasks"`);
  }
}
