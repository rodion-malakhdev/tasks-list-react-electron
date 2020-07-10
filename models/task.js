const { DataTypes, Model } = require("sequelize");

class Task extends Model{
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: DataTypes.UUID,
                    primaryKey: true,
                    defaultValue: DataTypes.UUIDV4,
                },
                description: {
                    type: DataTypes.STRING(1000),
                    allowNull: false,
                }
            },
            {
                sequelize,
                tableName: "tasks",
            }
        );
    }
}

module.exports = Task;
