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

router.put('/drawing/:id', async (req, res, next) => {
  console.log("put ===>",(req.params));
  console.log("put ===>",req.body)
  // res.json({message:"update the object types in the drawings"})
  // drawinginstance.setobjects() will be used herebut not really sure how exactly
  try{  
    let drawing = await Drawing.findOne({where: {id: req.params.id}})

    if(req.body.length === 2){ 
      let types = await  Object.findAll({where: { id: { [Op.or]:  [req.body[0].id, req.body[1].id] }}}) 
      await drawing.setObjects(types)
    }
    else if(req.body.length === 1) { 
      let types = await  Object.findAll({where: { id: req.body[0].id }}) 
      await drawing.setObjects(types)
    }
    return res.status(204).json({"message": "updated successfuly"})
  }catch(e) { 
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