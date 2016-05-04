'use strict'
let postRouter = require('express').Router();
let controllers = require('../controllers/controller.js');
let Post = controllers.Post;
let Donor = controllers.Donor;
let Hospital = controllers.Hospital;
let url = require('url');

postRouter.route('/')
.get((req, res) => {
  let queries = url.parse(req.url, true).query;
  let minLat = queries.minLat || -1000;
  let minLong = queries.minLong || -1000;
  let maxLat = queries.maxLat || 1000;
  let maxLong = queries.maxLong || 1000;
  let createdAt = queries.createdAt || 0;
  let limit = createdAt ? null : 20;

  Post.findAll({
    where: {
      latitude: {
        $gt: minLat,
        $lt: maxLat
      },
      longitude: {
        $gt: minLong,
        $lt: maxLong
      },
      createdAt: {
        $gt: createdAt
      }
    },
    include: [Donor, Hospital],
    limit: limit,
    order: 'createdAt DESC'
  })
  .then(posts => res.send(posts));
})
.post((req, res) => {
  let donorId = req.user.type === 'donor' ? req.user.id : null;
  let hospitalId = req.user.type === 'hospital' ? req.user.id : null;
  Post.create({
    content: req.body.content,
    donorId: donorId,
    hospitalId: hospitalId,
    latitude: req.body.location.latitude,
    longitude: req.body.location.longitude
  })
  .then(post => res.send(post));
});

module.exports = postRouter;