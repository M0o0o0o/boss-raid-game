const { body } = require("express-validator");
const index = require("./index");
const errorCodes = require("../codes/errorCodes");

const bossEnterValidator = () => {
  return [
    body("level")
      .notEmpty()
      .bail()
      .withMessage(errorCodes.REQUIRED)
      .isInt({ min: 1, max: 3 })
      .withMessage("레벨 선택은 1~3까지만 가능합니다."),
    body("userId")
      .notEmpty()
      .bail()
      .withMessage(errorCodes.REQUIRED)
      .isLength({ max: 36 })
      .withMessage(errorCodes.EXCEEDLENGTH(36)),
    index,
  ];
};

const bossEndValidator = () => {
  return [
    body("raidRecordId")
      .notEmpty()
      .bail()
      .withMessage(errorCodes.REQUIRED)
      .isLength({ max: 36 })
      .withMessage(errorCodes.EXCEEDLENGTH(36)),
    body("userId")
      .notEmpty()
      .bail()
      .withMessage(errorCodes.REQUIRED)
      .isLength({ max: 36 })
      .withMessage(errorCodes.EXCEEDLENGTH(36)),
    index,
  ];
};

module.exports = { bossEnterValidator, bossEndValidator };
