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

const dbConnectionTest = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// sequelize.close()

dbConnectionTest();


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
  drawing_uid: { 
    type: DataTypes.UUID, 
    defaultValue: Sequelize.UUIDV4, 
    allowNull: false, primaryKey: true 
  },
  uri: { type: DataTypes.STRING(2050), allowNull: false},
  info: { type: DataTypes.STRING(300), allowNull: false } 
},{
  // don't wanna use timestamps for now
  timestamps: false
},{
  // Apparently I can give the table name right away like this
  tableName: 'mock-drawing'
});

const Object = sequelize.define('Object', {
  object_uid: { 
    type: DataTypes.UUID, 
    defaultValue: Sequelize.UUIDV4, 
    allowNull: false, 
    primaryKey: true 
  },
  type: { type: DataTypes.STRING, allowNull: false},
},{
  tableName: 'mock_object'
},{
  timestamps: false
})

// I don't know how to create a realtion yet 
const Relation = sequelize.define('Relation', {
  relation_uid: { 
    type: DataTypes.UUID, 
    defaultValue: Sequelize.UUIDV4,
    allowNull: false, 
    primaryKey: true 
  },
  object_uid: { 
    type: DataTypes.UUID, 
    allowNull: false,
    references: {
      model: Object,
      key: Object.object_uid
    } 
  },
  drawing_uid: { 
    type: DataTypes.UUID, 
    references: {
      model: Drawing,
      key: Drawing.drawing_uid
    },
    allowNull: false 
  }
},{
  tableName: 'drawing_object_relation'
},{
  timestamps: false
})




console.log("is model successful ==> ",
  Drawing === sequelize.models.Drawing, 
  Object === sequelize.models.Object, 
  Relation === sequelize.models.Relation
);