const Sequelize = require("sequelize");

module.exports = class Record extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        recordId: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        raidRecordId: {
          type: Sequelize.UUID,
          allowNull: false,
        },
        score: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        enter_time: {
          type: Sequelize.STRING(19),
          allowNull: false,
        },
        end_time: {
          type: Sequelize.STRING(19),
          allowNull: false,
        },
      },
      {
        sequelize,
        underscored: false,
        timestamps: false,
        modelName: "Record",
        tableName: "records",
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }
  static associate(db) {
    db.Record.belongsTo(db.User, {
      foreignKey: "fk_user_id",
      allowNull: false,
    });
  }
};
