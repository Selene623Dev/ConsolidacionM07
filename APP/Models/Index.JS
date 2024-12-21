
const User = require("APP/Models/User.Model.JS"); 
const Bootcamp = require("APP/models/Bootcamp.Model.JS"); 
const conexion = require("APP/configuration/DBconfig.JS"); 

// Relación muchos a muchos: Un usuario puede estar en varios Bootcamps
User.belongsToMany(Bootcamp, {
    through: "bootcamps_users", 
    as: "bootcamps",           
    foreignKey: "user_id",     
});

Bootcamp.belongsToMany(User, {
    through: "bootcamps_users",
    as: "users",               
    foreignKey: "bootcamp_id", 
});

module.exports = { Bootcamp, User, conexion };