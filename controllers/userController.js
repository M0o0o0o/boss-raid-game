const { userService } = require("../services");
const addUser = async (req, res, next) => {
  try {
    const newUser = await userService.addUser();
    res.status(201).json({ userId: newUser.userId });
  } catch (err) {
    next(err);
  }
};

// userId validator 추가
// 아이디가 없는 경우와 결과값이 없는 경우를 나눠서 생각하자.
const getUserRecord = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { findUserRecords, findUserTotalScore } =
      await userService.getUserRecord(userId);

    if (findUserTotalScore === null) {
      res.status(400);
      throw new Error("사용자가 존재하지 않거나 기록이 없습니다.");
    }

    res.status(200).json({
      totalScore: findUserTotalScore,
      boassRaidHistory: findUserRecords,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { addUser, getUserRecord };
