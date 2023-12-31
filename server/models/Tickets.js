module.exports = (sequelize, DataTypes) => {
    const Tickets = sequelize.define("Tickets", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        showtime_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Showtimes',
                key: 'id'
            }
        },
        ticket_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        seat_number: {
            /* type: DataTypes.STRING(10), */
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Seats',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        payment_status: {
            /* type: DataTypes.ENUM('Paid', 'Available'), */
            type: DataTypes.ENUM('Pending', 'Paid', 'Failed', 'Refunded'),
            allowNull: false,
        }
    }, {
        tableName: 'Tickets',
        timestamps: false,
        indexes: [{
            unique: true,
            fields: ['showtime_id', 'seat_number']
        }],
    });

    Tickets.associate = (models) => {
        Tickets.belongsTo(models.Showtimes, {
            foreignKey: 'showtime_id',
            as: 'showtime',
            onDelete: 'CASCADE'
        });

        Tickets.belongsTo(models.Users, { 
            foreignKey: 'user_id',
            as: 'user',
            onDelete: 'CASCADE'
        });

        Tickets.belongsTo(models.Seats, {
            foreignKey: 'seat_number',
            as: 'seat',
            onDelete: 'CASCADE'
        });
    };
  
    /*Tickets.associate = (models) => {
      Tickets.hasMany(models.Comments, {
        onDelete: "cascade",
      });
    };*/
    return Tickets;
  };