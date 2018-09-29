const express = require('express');
const { Student, School } = require('../db').models;
const router = express.Router();
module.exports = router;

router.get('/', (req, res, next) => {
  Student.findAll({
    order: [['lastName', 'DESC']],
    include: [School],
  })
    .then(students => res.send(students))
    .catch(next);
});
router.get('/:id', (req, res, next) => {
  Student.findById(req.params.id, {
    include: [School],
  })
    .then(student => res.send(student))
    .catch(next);
});
router.use(require('body-parser').json());
router.post('/', (req, res, next) => {
  Student.create(req.body)
    .then(student => res.send(student))
    .catch(next);
});
router.delete('/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => student.destroy())
    .then(() => res.sendStatus(200))
    .catch(next);
});
router.put('/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => student.update(req.body))
    .then(student => res.send(student))
    .catch(next);
});
