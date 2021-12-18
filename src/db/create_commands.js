// I will keep the bulkcreate commands here, just in case
const { Drawing, Object, Drawing_Object } = require('./models.js');

const {sequelize, dbConnectionTest } = require('./connection.js');

(async() => {
  try {
    await Object.bulkCreate([
      { type: 'architecture' },
      { type: 'nature' },
      { type: 'fantasy' },
      { type: 'interior' },
      { type: 'figure' },
      { type: 'free' },
      { type: 'historical' },
      { type: 'face' },
      { type: 'view' },
      { type: 'urban' }
    ])
  } catch (error) {
    console.log("didn't work ==>", error)
  }



})();