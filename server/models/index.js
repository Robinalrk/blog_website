// server/models/index.js
const sequelize = require('../config/database');
const User = require('./User');
const Post = require('./Post');

// Set up associations
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

const db = {
    sequelize,
    User,
    Post
};

module.exports = db;
