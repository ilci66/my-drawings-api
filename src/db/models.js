require('dotenv').config();
const { DataTypes } = require('sequelize');
const {sequelize, dbConnectionTest } = require('./connection.js');

const Drawing_Object = sequelize.define('drawings_objects', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  }
}, { timestamps: false });

const Drawing = sequelize.define('drawing', {
  url: { 
    type: DataTypes.STRING,
    unique: true,
    allowNull: false 
  },
  title: { 
    type: DataTypes.STRING(1000),     
    unique: true,
    allowNull: false 
  },
  description: {
    type: DataTypes.STRING
  }
});

const Object = sequelize.define('object', {
  type: {
    type: DataTypes.STRING, 
    allowNull: false,
    unique: true
  }
});


Object.belongsToMany(Drawing, { through: Drawing_Object });
Drawing.belongsToMany(Object, { through: Drawing_Object });

// created the models here, wanna get used to using practice
// (async() => {
//   try {
//     await dbConnectionTest();
//     await sequelize.sync();
//   } catch (error) {
//     console.log("something happened yo! ==>",error)
//   }
// })();


module.exports = { Drawing, Object, Drawing_Object };