const { v4: uuidv4 } = require("uuid");
const { userRepository, recordRepository } = require("../reposotires");

const addUser = async () => {
  try {
    const newUser = await userRepository.createUser(uuidv4());
    return newUser;
  } catch (err) {
    throw err;
  }
};

const getUserRecord = async (userId) => {
  try {
    const results = await recordRepository.findUserRecord(userId);
    return results;
  } catch (err) {
    throw err;
  }
};

module.exports = { addUser, getUserRecord };
