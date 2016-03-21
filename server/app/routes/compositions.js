var router = require('express').Router();
var models = require('../../db/models/');
var Compositions = models.Compositions;
var Comments = models.Comments;

router.get('/', function(req, res, next) {
  var query = Composition.find();
  if (req.query.includeTracks) query = query.populate('tracks');
  query.exec()
  .then(function(compositions) {
    res.json(compositions);
  })
  .catch(null, next);
});

router.post('/', function(req, res, next) {
  var comp = new Composition(req.body);
  comp.creator = req.user;
  comp.save()
  .then(function(comp) {
    res.status(201).json(comp);
  })
});

router.param('compositionId', function(req, res, next) {
  var query = Composition.findById(req.params.compositionId);
  if (req.query.includeTracks) query = query.populate('tracks');
  query.exec()
  .then(function(composition) {
    if (composition) {
      req.composition = composition;
      next();
    } else {
      next(new Error('failed to find composition'));
    }
  })
  .catch(null, next)
})

router.get('/compositionId', function(req, res, next) {
  res.json(req.composition);
});

router.put('/compositionId', functino(req, res, next) {
  req.composition.set(req.body);
  req.composition.save()
  .then(function(composition){
    res.status(201).json(composition);
  })
});

router.delete('/compositionId', function(req, res, next) {
  req.composition.remove()
  .then(function(){
    res.status(204).send();
  })
});

router.use('/compositionId/tracks', require('./tracks') );

router.get('/compositionId/comments', function(req, res, next) {
  Comment.find({target: req.params.compositionId})
  .then(function(comments) {
    res.json(comments);
  })
  .then(null, next);
});

module.exports = router;