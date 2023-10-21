module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        first_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true
        },

        profile_url: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        profile_thumbnail_url: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM("User", "Admin", "Manager"),
            allowNull: false,
            defaultValue: "User"
        },
    });

    Users.associate = (models) => {
        Users.hasMany(models.Tickets, {
            foreignKey: 'user_id',
            as: 'tickets',
        });
        
        Users.hasMany(models.Comments, {
            foreignKey: 'user_id',
            as: 'comments',
        });
    };
  
    return Users;
};