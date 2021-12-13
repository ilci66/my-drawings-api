require('dotenv').config();
const { Sequelize, DataTypes, Op, QueryTypes } = require('sequelize');
const { USER, HOST, DATABASE, PASSWORD, POSTGRESQL_PORT } = process.env;
console.log(USER, HOST, DATABASE, PASSWORD, POSTGRESQL_PORT)


const sequelize = new Sequelize(DATABASE, USER, PASSWORD, { host: 'localhost', dialect: 'postgres'});

const dbConnectionTest = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
dbConnectionTest();

//   ======> ONE TO ONE <=========== 
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
  foreignKey: {
    name: 'myFooId',
    allowNull: false
  }
  // onDelete: 'RESTRICT',
  // onUpdate: 'RESTRICT'
});
Bar.belongsTo(Foo, {
  foreignKey: {
    name: 'myFooId',
    allowNull: false
  }
});



//   ======> ONE TO MANY <=========== 

const Player = sequelize.define('teams', {
  id: { 
    type: DataTypes.UUID, 
    defaultValue: Sequelize.UUIDV4, 
    primaryKey: true,
  }
});

const Team = sequelize.define('players', {
  id: { 
    type: DataTypes.UUID, 
    defaultValue: Sequelize.UUIDV4, 
    primaryKey: true,
  }
});

Team.hasMany(Player, { foreignKey: 'clubId' });
Player.belongsTo(Team, { foreignKey: 'clubId' });


// ============> MANY TO MANY <==========
const Movie = sequelize.define('movie', { name: DataTypes.STRING });
const Actor = sequelize.define('actor', { name: DataTypes.STRING });

// If you wanna create the junction table manually:
// const ActorMovies = sequelize.define('actors_movies', {
//   // MovieId: {
//   //   type: DataTypes.INTEGER,
//   //   references: {
//   //     model: Movie, // 'Movies' would also work
//   //     key: 'id'
//   //   }
//   // },
//   // ActorId: {
//   //   type: DataTypes.INTEGER,
//   //   references: {
//   //     model: Actor, // 'Actors' would also work
//   //     key: 'id'
//   //   }
//   // }
// });

// looks like the uniqueKey option didn't work for naming
Movie.belongsToMany(Actor, { through: 'actors_movies', unique: false, uniqueKey: 'movie_id' });
Actor.belongsToMany(Movie, { through: 'actors_movies', uniqueKey: "actor_id" }); 



// ===========> BASIC QUERIES <============
// These models are going to be used for queries, one-to-one

const Ship = sequelize.define('ship', {
  name: DataTypes.TEXT,
  crewCapacity: DataTypes.INTEGER,
  amountOfSails: DataTypes.INTEGER
}, { timestamps: false });

const Captain = sequelize.define('captain', {
  name: DataTypes.TEXT,
  skillLevel: {
    type: DataTypes.INTEGER,
    validate: { min: 1, max: 10 }
  }
}, { timestamps: false });

Captain.hasOne(Ship, 
  //{foreignKey: 'bossId'}
);
Ship.belongsTo(Captain, 
  //{foreignKey: 'bossId'}
);



try {
  setTimeout(async() => {

    // await Movie.sync()
    // await Actor.sync()
    // await ActorMovies.sync()
    // THE SYNC() ETHODS ABOVE DON'T CREATE THE JUNCTION TABLE     
    await sequelize.sync({ alter: { drop : false }});

    // ======> ONE-TO-MANY
    // await Team.sync();
    // await Player.sync();

    // ======> ONE-TO-ONE
    // await Foo.sync();
    // await Bar.sync();
    // the one below worked also for me in this case
    // await sequelize.sync({ alter: { drop : false }});

    // ======> BASIC QUERIES
    
    // Example query, { include: Ship } option gets the associated ship data, cool, keeping this as an example for EAGER LOADING
    // const awesomeCaptain = await Captain.findOne({
    //   where: {
    //     name: "Jack Sparrow"
    //   },
    //   include: Ship
    // });
    // // Now the ship comes with it
    // console.log('Name:', awesomeCaptain.name);
    // console.log('Skill Level:', awesomeCaptain.skillLevel);
    // console.log('Ship Name:', awesomeCaptain.ship.name);
    // console.log('Amount of Sails:', awesomeCaptain.ship.amountOfSails);


    // LAZY LOADING EXAMPLE, get the info when you need it, getShip() method is automatically created by sequelize, how cool is that!
    // const awesomeCaptain = await Captain.findOne({
    //   where: {
    //     name: "Jack Sparrow"
    //   }
    // });
    // // Do stuff with the fetched captain
    // console.log('Name:', awesomeCaptain.name);
    // console.log('Skill Level:', awesomeCaptain.skillLevel);
    // // Now we want information about his ship!
    // const hisShip = await awesomeCaptain.getShip();
    // // Do stuff with the ship
    // console.log('Ship Name:', hisShip.name);
    // console.log('Amount of Sails:', hisShip.amountOfSails);

  }, 1500)
} catch (error) {
  console.log(error)
}


// ====================> IMPORTANT NOTE <========================
// When a Sequelize association is defined between two models, only the source model knows about it.
// So, for example, when using Foo.hasOne(Bar) (so Foo is the source model and Bar is the target model), 
// only Foo knows about the existence of this association. This is why in this case, as shown above, Foo 
// instances gain the methods getBar(), setBar() and createBar(), while on the other hand Bar instances get 
// nothing. So Foo.findOne({ include: Bar }) is possible but Bar.findOne({ include: Foo }) throws an error.
// For this reason the associations appear in pairs (Foo.hasOne(Bar) and Bar.belongsTo(Foo)).
