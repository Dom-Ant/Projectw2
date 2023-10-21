// generate seats for theatreroom
const generateSeatCodes = (capacity, seatsPerRow) => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let seatCodes = [];
    let numberOfRows = Math.ceil(capacity / seatsPerRow);
  
    for (let row = 0; row < numberOfRows; row++) {
      for (let col = 1; col <= seatsPerRow && (row * seatsPerRow + col) <= capacity; col++) {
        let seatCode = `${alphabet[row]}${col}`;
        seatCodes.push(seatCode);
      }
    }
  
    return seatCodes;
  };

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
        seats_per_row: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'TheaterRooms',
        timestamps: false,
    });

    TheaterRooms.afterCreate((theaterRoom, options) => {
        const seatCodes = generateSeatCodes(theaterRoom.seat_capacity, theaterRoom.seats_per_row);
        
        const seatObjects = seatCodes.map(code => ({
          room_id: theaterRoom.id,
          seat_code: code
        }));
      
        return sequelize.models.Seats.bulkCreate(seatObjects);
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