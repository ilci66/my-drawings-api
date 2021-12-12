require('dotenv').config();
const { Sequelize, DataTypes, Op, QueryTypes } = require('sequelize');
const { USER, HOST, DATABASE, PASSWORD, POSTGRESQL_PORT } = process.env;
console.log(USER, HOST, DATABASE, PASSWORD, POSTGRESQL_PORT)


const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: 'localhost',
  dialect: 'postgres'
});

const dbConnectionTest = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
dbConnectionTest();


const Foo = sequelize.define('foos', {
  id: { 
    type: DataTypes.UUID, 
    defaultValue: Sequelize.UUIDV4, 
    primaryKey: true,
  }
});

const Bar = sequelize.define('bars', {
  id: { 
    type: DataTypes.UUID, 
    defaultValue: Sequelize.UUIDV4, 
    primaryKey: true,
  }
});


Foo.hasOne(Bar, {
  // onDelete: 'RESTRICT',
  // onUpdate: 'RESTRICT'
});
Bar.belongsTo(Foo);





try {
  setTimeout(async() => {
    // Bar.sync();
    // In the docs they just used the code above but the one below worked for me in this case
    // await sequelize.sync({ alter: { drop : false }});
  },1500)
} catch (error) {
  console.log(error)
}


// READ ABOUT CUSTOMIZING THE FOREIGN KEY AFTER YOUR BREAK