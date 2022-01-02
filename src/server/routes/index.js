const express = require('express');
const router = express.Router();
const { Op } = require("sequelize");
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
  let allDrawings = await Drawing.findAll({include: Object})
  res.status(200).json(allDrawings);
});

router.get('/drawing/:id', async (req, res, next) => {
  // console.log(req.query.params);
  res.send("get the drawing")
});

router.delete('/drawing/:id', async (req, res, next) => {
  // console.log(req.query.params);
  res.send("delete the drawing")
});

// this was supposed to be put btut i don't wanna add the functionaity to add drawings here
router.post('/drawing/:id', async (req, res, next) => {

  const t = await sequelize.transaction();

  console.log("PUT params ===>",(req.params), "body ===>",req.body);
  
  try{  
    let drawing = await Drawing.findOne({where: {id: req.params.id}})
    if(req.body.length === 2){ 
      let types = await  Object.findAll({where: { id: { [Op.or]:  [req.body[0].id, req.body[1].id] }}}) 
      await drawing.setObjects(types, { transaction: t })
      // console.log("length is 2 and sending drawing ==>", drawing)
      await t.commit();
      await drawing.save()
      return res.status(200).json(drawing)
    }
    else{ 
    // else if(req.body.length === 1) { 
      let types = await  Object.findAll({where: { id: req.body[0].id }}) 
      await drawing.setObjects(types, { transaction: t })
      // console.log("length is not 2 and sending drawing ==>",drawing)
      await t.commit();

      await drawing.save()
      return res.status(200).json(drawing)
    }
  }catch(e) { 
    await t.rollback();
    console.log("error occured while setting type ==> ", e)
    return res.status(400).json({error: e})
  } 
})

router.all('*', (req, res, next) =>
  res.status(404).json({
    message: 'Didn\'t create the route yet',
  }),
);

module.exports = router;