module.exports = (sequelize, DataTypes) => {
    const Seats = sequelize.define("Seats", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        room_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'TheaterRooms',
                key: 'id'
            }
        },
        seat_code: {
            type: DataTypes.STRING(10),
            allowNull: false,
        }
    }, {
        tableName: 'Seats',
        timestamps: false,
        indexes: [{
            unique: true,
            name: 'seatUnique',
            fields: ['room_id', 'seat_code']
        }],
    });

    Seats.associate = (models) => {
        Seats.belongsTo(models.TheaterRooms, {
            foreignKey: 'room_id',
            as: 'room',
            onDelete: 'CASCADE'
        });
        
        Seats.hasMany(models.Tickets, {
            foreignKey: 'seat_number',
            as: 'tickets',
            onDelete: 'CASCADE'
        });
    };

    return Seats;
};