require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const { USER, HOST, DATABASE, PASSWORD, POSTGRESQL_PORT } = process.env;
console.log(USER, HOST, DATABASE, PASSWORD, POSTGRESQL_PORT)

// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname')
// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
// });

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: 'localhost',
  dialect: 'postgres'
});

const test = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// sequelize.close()

test();


// const { Sequelize, DataTypes } = require('sequelize');

// const User = sequelize.define('User', {
//   // Model attributes are defined here
//   firstName: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   lastName: {
//     type: DataTypes.STRING
//     // allowNull defaults to true
//   }
// }, {
//   // Other model options go here
// });

// // `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true

const Drawing = sequelize.define('Drawing', {
  drawing_uid: { type: DataTypes.UUID, allowNull: false },
  uri: { type: DataTypes.STRING, allowNull: false},
  info: { type: DataTypes.STRING, allowNull: false } 
})
console.log("is model successful ==> ",Drawing === sequelize.models.Drawing);