module.exports = (sequelize, DataTypes) => {
    const Venues = sequelize.define("Venues", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        timestamps: false,
    });

    return Venues;
};