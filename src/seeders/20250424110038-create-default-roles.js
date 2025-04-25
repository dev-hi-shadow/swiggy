"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "roles",
      [
        {
          name: "Super Admin",
          description: "Super admin can do anything in the system",
          permissions: JSON.stringify({
            users: ["read", "write", "update", "delete"],
            restaurants: ["read", "write", "update", "delete"],
          }),
          is_active: true,
          is_admin: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", {
      name: "Super Admin",
    });
  },
};
