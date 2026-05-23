import { QueryInterface } from 'sequelize';

export default {
    async up(queryInterface: QueryInterface) {
        await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS hotels(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(250) NOT NULL,
        address VARCHAR(250) NOT NULL,
        location VARCHAR(250) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
      `);
    },

    async down(queryInterface: QueryInterface) {
        await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS hotels;
      `);
    },
};
