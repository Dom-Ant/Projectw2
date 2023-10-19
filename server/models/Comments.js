module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("Comments", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        movie_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Movies',
                key: 'id'
            }
        },
        comment_text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        timestamp: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        }
    }, {
        timestamps: false,
    });

    Comments.associate = (models) => {
        Comments.belongsTo(models.Users, {
            foreignKey: 'user_id',
            as: 'user',
            onDelete: 'CASCADE'
        });

        Comments.belongsTo(models.Movies, {
            foreignKey: 'movie_id',
            as: 'movie',
            onDelete: 'CASCADE'
        });
    };

    /*Comments.associate = (models) => {
      Comments.hasMany(models.Comments, {
        onDelete: "cascade",
      });
    };*/
    return Comments;
  };