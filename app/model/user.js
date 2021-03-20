const sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            
            autoIncrement: true,
            primaryKey: true
        },
        firstname: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
              notNull: { msg: "firstname is required" },
            },          
        },
        lastname: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
              notNull: { msg: "lastname is required" },
            },          
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
              notNull: { msg: "email is required" },
            },          
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
              notNull: { msg: "password is required" },
            },          
        },
        address: {
            type: Sequelize.STRING,
        },
        mobileno: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
              notNull: { msg: "Mobile number is required" },
            },          
        },

    });  
    return User;
}
