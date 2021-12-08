import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1638993498124 implements MigrationInterface {
    name = 'Initial1638993498124'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transaction_request_trace" ("id" SERIAL NOT NULL, "message" character varying NOT NULL, "type" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "transactionRequestId" integer, CONSTRAINT "PK_b78a22ffabebc03a7bc3626ef58" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction_request" ("id" SERIAL NOT NULL, "requestId" character varying NOT NULL, "transactionId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_ab528f0dacc224cd6229692dce0" UNIQUE ("requestId", "transactionId"), CONSTRAINT "PK_92f7cd60c08a37010e10f274a47" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transaction_request_trace" ADD CONSTRAINT "FK_b20967f0b68920ce3d3356d030a" FOREIGN KEY ("transactionRequestId") REFERENCES "transaction_request"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "transaction_request" ADD CONSTRAINT "FK_999cd6391c359229ca18608e8d5" FOREIGN KEY ("transactionId") REFERENCES "transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction_request" DROP CONSTRAINT "FK_999cd6391c359229ca18608e8d5"`);
        await queryRunner.query(`ALTER TABLE "transaction_request_trace" DROP CONSTRAINT "FK_b20967f0b68920ce3d3356d030a"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TABLE "transaction_request"`);
        await queryRunner.query(`DROP TABLE "transaction_request_trace"`);
    }

}
