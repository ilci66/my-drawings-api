require('dotenv').config();
const { Sequelize, DataTypes, Op } = require('sequelize');
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


// sequelize.close()

const dbConnectionTest = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
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

const Drawing = sequelize.define('mock_drawings', {
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
  // Apparently I can give the table name right away like this, but did not affect the query 
  // tableName: 'mock_drawings'
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




const simpleSelect = async () =>  {
  try{
    // GET EVERYTHING
    // const allDrawings = await Drawing.findAll();

    // CERTAIN COLUMNS
    // const allDrawings = await Drawing.findAll({ 
      // attributes: ["info", [sequelize.fn('COUNT', sequelize.col('info')), 'n_info'], "drawing_uid"], 
      // group:["drawing_uid"] 
    // });
    

    // AGAIN CERTAIN COLUMNS, but throws an error because of the syntax 
    // const allDrawings = await Drawing.findAll({ 
    //   attributes: {
    //     exclude: "uri", 
    //     include: [ [sequelize.fn('COUNT', sequelize.col('info')), 'n_info'] ],
    //   },
    //   // Use like this
    //   group: 'drawing_uid' 
    // });
    
    // // console.log("simple query ==>",allDrawings);

    // console.log("are they instances of Drawings ==>",allDrawings.every(drawing => drawing instanceof Drawing));
    
    // console.log("All drawings:", JSON.stringify(allDrawings, null, 2));


    // SINGLE ITEMS
    let exampleDrawingUid = 'f3cba304-a14a-4ad6-acc8-8fb81dcd453b';
    let exampleDrawingUid2 = 'fb88237f-6f90-4019-b4ef-af93194e89c8';

    // const singleDrawing = await Drawing.findAll({
    //   attributes: { exclude: "uri" },
    //   where: { drawing_uid: exampleDrawingUid }
    // })
 
    // This is how OR is used, Op allows the usage on "is", "eq", "ne", "gte" etc. Check the documents when in need of using one 
    // let singleDrawing = await Drawing.findAll({
    //   attributes: { exclude: "uri" },
    //   where: {
    //     [Op.or] : [
    //       { drawing_uid: exampleDrawingUid },
    //       { drawing_uid: exampleDrawingUid2 }
    //     ]
    //   }
    // })
    
    // just adding this to try a relatively complicated one from docs that can be used in PostgreSQL
    // let singleDrawing = await Drawing.findAll({
    //   attributes: { exclude: "uri" },
    //   where: { 
    //     info: {
    //       [Op.like]: { 
    //         [Op.any]:  ['%Left%', exampleDrawingUid] 
    //     }
    //     }
        
    //   }
    // });

    // Querying from 'IN'
    // let singleDrawing = await Drawing.findAll({
    //   attributes: { exclude: "uri" },
    //   where: { 
    //     drawing_uid: [ exampleDrawingUid, exampleDrawingUid2]
    //     }
    // });

    // console.log("Single drawing:", JSON.stringify(singleDrawing, null, 2));

    // CREATE IN BULK
    // const toCreateInBulk = await Drawing.bulkCreate([
    //   {info: "some drawing"},
    //   {info: "some other drawing"},
    // ])

    // console.log(toCreateInBulk.length); // 2
    // console.log(toCreateInBulk[0] instanceof Drawing); // true
    // console.log(toCreateInBulk[0].info); 
    // console.log(toCreateInBulk[0].drawing_uid); 

    // JUST DELETING THE LAST EXAMPLES
    // await Drawing.destroy({
    //   where: {
    //     info: ["some drawing", "some other drawing"]
    //   }
    // });

    // This query creates one if can't find the entry
    // DOESN'T WORK PROPERLY YET FIND OUT WHY AFTER YOUR BREAK
    // const [ singleDrawing, createdDrawing ] = await Drawing.findOrCreate({
    //   where: { info: 'This exists!' },
    //   defaults: {
    //     uri: 'This is the uri',
    //     info: 'This exists'
    //   }
    // });
    // if(singleDrawing) console.log( "already in database")
    // else{console.log("created ==>")}

  }catch(error){
    console.log("error caught ==>", error )
  }

};

setTimeout(() => {
  simpleSelect()
}, 1000)