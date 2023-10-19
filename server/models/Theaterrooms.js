module.exports = (sequelize, DataTypes) => {
    const TheaterRooms = sequelize.define("TheaterRooms", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        venue_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Venues', 
                key: 'id'
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        seat_capacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'TheaterRooms',
        timestamps: false,
    });

    TheaterRooms.associate = (models) => {
        TheaterRooms.belongsTo(models.Venues, {  
            foreignKey: 'venue_id',
            as: 'venue',
            onDelete: 'CASCADE'  // this deletes theatre rooms if a venue is deleted
        });
    };
  
    /*Theaterrooms.associate = (models) => {
      Theaterrooms.hasMany(models.Comments, {
        onDelete: "cascade",
      });
    };*/
    return TheaterRooms;
  };