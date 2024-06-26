import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUserRole1719435626601 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'role',
        type: 'varchar',
        isNullable: true, // Allow null values temporarily
        default: "'farmer'",
      }),
    );

    // Update existing rows to set a default role
    await queryRunner.query(
      `UPDATE "user" SET "role" = 'user' WHERE "role" IS NULL`,
    );

    // Alter the column to disallow null values
    await queryRunner.changeColumn(
      'user',
      'role',
      new TableColumn({
        name: 'role',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'role');
  }
}
