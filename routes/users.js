var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.json({
    users: [
      { id: 123, name: 'Eladio  Guardiola', phones: {} }
    ]
  });
});

router.get('/:id',function (req,res){
  if(req.params.id == "123"){
    res.json({ id: 123, name: 'Eladio  Guardiola', phones: {} })
  }else {
    res.status(404).send('¡Lo siento el item no fue encontrado!')
  }
})

router.post('/',(req,res)=>{
  const new_user = req.body
  res.status(200).send('Usuario' + new_user.name + ' ha sido añadido satisfactoriamente')
})

router.put('/:id',function (req,res) {
  const updated_user = req.body
  res.status(200).send('Usuario' + updated_user.name + 'ha sido actualizado satisfactoriamente')
  
})


router.delete('/:id',function (req,res) {
  
  res.status(200)
  .send('Usuario' + req.params.id + 'ha sido eliminado satisfactoriamente')
  
})
module.exports = router;
