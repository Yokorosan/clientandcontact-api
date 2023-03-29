import { MigrationInterface, QueryRunner } from "typeorm";

export class updatingclient1679356179094 implements MigrationInterface {
    name = 'updatingclient1679356179094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "password" character varying(120) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "password" character varying(100) NOT NULL`);
    }

}
