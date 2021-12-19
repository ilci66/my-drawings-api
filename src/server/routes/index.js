const express = require('express');
const router = express.Router();

const {sequelize, dbConnectionTest } = require('../../db/connection.js');
const { Drawing, Object, Drawing_Object } = require('../../db/models.js');




dbConnectionTest();

router.get('/drawings', async (req, res, next) => {

  let allDrawings = await Drawing.findAll({})
  res.status(200).json(allDrawings)
});



// router.all('*', (req, res, next) =>
//   res.status(404).json({
//     message: 'Didn\'t create the route yet',
//   }),
// );

module.exports = router;