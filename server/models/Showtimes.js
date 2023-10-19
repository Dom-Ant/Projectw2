module.exports = (sequelize, DataTypes) => {
    const Showtimes = sequelize.define("Showtimes", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        movie_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Movies',
                key: 'id'
            }
        },
        room_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'TheaterRooms',
                key: 'id'
            }
        },
        show_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        show_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
    }, {
        tableName: 'Showtimes',
        timestamps: false,
    });

    Showtimes.associate = (models) => {
        Showtimes.belongsTo(models.Movies, {
            foreignKey: 'movie_id',
            as: 'movie',
            onDelete: 'CASCADE'
        });

        Showtimes.belongsTo(models.TheaterRooms, {
            foreignKey: 'room_id',
            as: 'theaterRoom',
            onDelete: 'CASCADE'
        });
    };
  
    /*Showtimes.associate = (models) => {
      Showtimes.hasMany(models.Comments, {
        onDelete: "cascade",
      });
    };*/
    return Showtimes;
  };