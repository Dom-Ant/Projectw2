module.exports = (sequelize, DataTypes) => {
    const Movies = sequelize.define("Movies", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        poster_url: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        poster_thumbnail_url: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        synopsis: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        timestamps: false,    // no created dates
    });
  
    /*Movies.associate = (models) => {
      Movies.hasMany(models.Comments, {
        onDelete: "cascade",
      });
    };*/
    return Movies;
  };