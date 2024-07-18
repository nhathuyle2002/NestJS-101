import { MigrationInterface, QueryRunner } from "typeorm";

export class InitLocation1721097649216 implements MigrationInterface {
    name = 'InitLocation1721097649216'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "locations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "country" character varying NOT NULL, "state" character varying NOT NULL, CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "houses" ADD "locationId" uuid`);
        await queryRunner.query(`ALTER TABLE "houses" ADD CONSTRAINT "FK_d72f6921716045220a76685473f" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "houses" DROP CONSTRAINT "FK_d72f6921716045220a76685473f"`);
        await queryRunner.query(`ALTER TABLE "houses" DROP COLUMN "locationId"`);
        await queryRunner.query(`DROP TABLE "locations"`);
    }

}
