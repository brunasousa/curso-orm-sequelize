'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Niveis', [
      {
				descri_nivel: 'básico',
				createdAt: new Date(),
				updatedAt: new Date()			
			},
			{
				descri_nivel: 'intermediário',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				descri_nivel: 'avançado',
				createdAt: new Date(),
				updatedAt: new Date()
			} 
    ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Niveis', null, {});
  }
};
