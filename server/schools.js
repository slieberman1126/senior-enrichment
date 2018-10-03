const express = require('express');
const { School } = require('../db').models;
const router = express.Router();
module.exports = router;

router.get('/', (req, res, next) => {
  School.findAll()
    .then(schools => res.send(schools))
    .catch(next);
});
router.get('/:id', (req, res, next) => {
  School.findById(req.params.id)
    .then(school => res.send(school))
    .catch(next);
});
router.use(require('body-parser').json());
router.post('/', (req, res, next) => {
  School.create(req.body)
    .then(school => res.send(school))
    .catch(next);
});
router.delete('/:id', (req, res, next) => {
  School.findById(req.params.id)
    .then(school => school.destroy())
    .then(() => res.sendStatus(200))
    .catch(next);
});
router.put('/:id', (req, res, next) => {
  School.findById(req.params.id)
    .then(school => school.update(req.body))
    .then(school => res.send(school))
    .catch(next);
});
