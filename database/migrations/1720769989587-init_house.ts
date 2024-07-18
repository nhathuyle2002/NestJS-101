import { MigrationInterface, QueryRunner } from "typeorm";

export class InitHouse1720769989587 implements MigrationInterface {
    name = 'InitHouse1720769989587'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "houses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "ownerId" uuid NOT NULL, "MFG" TIMESTAMP NOT NULL, CONSTRAINT "PK_ee6cacb502a4b8590005eb3dc8d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "houses" ADD CONSTRAINT "FK_7650e11f6b342a7fcb233a11f95" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "houses" DROP CONSTRAINT "FK_7650e11f6b342a7fcb233a11f95"`);
        await queryRunner.query(`DROP TABLE "houses"`);
    }

}
