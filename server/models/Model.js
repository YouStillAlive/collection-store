const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    isBlocked: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    role: { type: DataTypes.STRING, defaultValue: "USER" }
});

const Collection = sequelize.define('collections',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, unique: false, allowNull: false },
        description: { type: DataTypes.STRING, unique: false, allowNull: false }
    });

const Item = sequelize.define('item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: false, allowNull: false },
    description: { type: DataTypes.STRING, unique: false, allowNull: false },
    tags: {type: DataTypes.STRING, unique: true}
});

const Comments = sequelize.define('comments', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: false, allowNull: false },
    content: { type: DataTypes.STRING, unique: false, allowNull: false }
});

Collection.hasMany(Item);
Item.belongsTo(Collection);

User.hasMany(Collection);
Collection.belongsTo(User);

User.hasMany(Comments);
Comments.belongsTo(User);

Item.hasMany(Comments);
Comments.belongsTo(Item);

module.exports = { User, Collection, Item };