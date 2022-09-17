const { Sequelize } = require("sequelize");
const { User, sequelize, Record } = require("../database/models");
const logger = require("../logger");

const createUser = async (userId) => {
  try {
    return await User.create({ userId });
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

module.exports = { createUser };
