'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Photos', [{
      title: 'My first photo',
      caption: 'This is my first photo',
      image_url: 'https://picsum.photos/200/300',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'My second photo',
      caption: 'This is my second photo',
      image_url: 'https://picsum.photos/200/300',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'My third photo',
      caption: 'This is my third photo',
      image_url: 'https://picsum.photos/200/300',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'My fourth photo',
      caption: 'This is my fourth photo',
      image_url: 'https://picsum.photos/200/300',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
