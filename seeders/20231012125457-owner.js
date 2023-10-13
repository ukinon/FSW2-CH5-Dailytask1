const bcrypt = require("bcrypt");
const { User } = require("../models");
("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const newOwner = await User.bulkCreate(
      [
        {
          name: "papi",
          age: 20,
          address: "bogor",
          role: "Owner",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "pepe",
          age: 42,
          address: "tangerang",
          role: "Owner",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "papa",
          age: 20,
          address: "jakarta",
          role: "Owner",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "pepo",
          age: 25,
          address: "madura",
          role: "Owner",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "papo",
          age: 19,
          address: "bandung",
          role: "Owner",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    ).then(function (newOwner) {
      const saltRounds = 10;
      return queryInterface.bulkInsert("Auths", [
        {
          email: "papi@gmail.com",
          password: bcrypt.hashSync("bogor123", saltRounds),
          userId: newOwner[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "pepe@gmail.com",
          password: bcrypt.hashSync("tangerang123", saltRounds),
          userId: newOwner[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "papa@gmail.com",
          password: bcrypt.hashSync("jakarta123", saltRounds),
          userId: newOwner[2].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "pepo@gmail.com",
          password: bcrypt.hashSync("madura123", saltRounds),
          userId: newOwner[3].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "papo@gmail.com",
          password: bcrypt.hashSync("bandung123", saltRounds),
          userId: newOwner[4].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
