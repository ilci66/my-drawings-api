const express = require('express');
const router = express.Router();

const {sequelize, dbConnectionTest } = require('../../db/connection.js');
const { Drawing, Object, Drawing_Object } = require('../../db/models.js');

dbConnectionTest();


router.get('/', async (req, res, next) => {
  res.send('It works')
})
router.get('/objects', async (req, res, next) => {
  let allObjects = await Object.findAll({});
  res.status(200).json(allObjects);
})
router.get('/drawings', async (req, res, next) => {
  let allDrawings = await Drawing.findAll({})
  res.status(200).json(allDrawings);
});

router.get('drawing/:id', async (req, res, next) => {
  // console.log(req.query.params);
  res.send("get the drawing")
});

router.put('drawing/:id', async (req, res, next) => {
  // console.log(req.query.params);
  res.send("update the object types in the drawings")
})

router.all('*', (req, res, next) =>
  res.status(404).json({
    message: 'Didn\'t create the route yet',
  }),
);

module.exports = router;