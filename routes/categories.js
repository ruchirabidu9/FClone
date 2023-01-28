'use strict';
const authe = require('../middlewares/authe');
const db = require('../models/index');
const express = require('express');
const { categories } = require('../models/index');
const admin = require('../middlewares/admin');
const router = express.Router();

router.get('/', async (req, res) => {
  const categories = await db.categories.findAll();
  res.send(categories);
});

router.post('/', [authe, admin], async (req, res) => {
  const category = new db.categories({ name: req.body.name});
  await category.save();
  res.send(category);
});

router.put('/:id', [authe, admin], async (req, res) => {
  const category = await db.categories.update({name: req.body.name}, {
    where: {id: req.params.id},
    returning: true
  });
  if (!category) return res.status(404).send('The preferred category was not found'); 
  res.send(category);
});

router.delete('/:id', [authe, admin], async (req, res) => {
  const category = await db.categories.destroy({
    where: { id: req.params.id},
    returning: true
  });
  if(!category) return res.sendStatus(400).send('The catergory was not found');
  res.sendStatus(200).send(category);
});

module.exports = router;