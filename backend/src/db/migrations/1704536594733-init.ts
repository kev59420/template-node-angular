import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1704536594733 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
                INSERT INTO deboinvest."user"("firstName", "lastName", email, password, role)
                VALUES ('kevin', 'debonnet', 'kev59420@gmail.com', '$2b$10$PpHkW4dfAgCPQtIze7NDAOebHsb/kZVaAhpGVURc2/nSrfKRYILZy', 'ADMIN');
            `
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
