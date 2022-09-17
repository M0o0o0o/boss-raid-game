const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
      },
      {
        sequelize,
        underscored: false,
        timestamps: false,
        modelName: "User",
        tableName: "users",
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Record, {
      foreignKey: "fk_user_id",
      allowNull: false,
    });
  }
};
