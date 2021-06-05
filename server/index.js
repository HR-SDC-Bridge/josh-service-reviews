const newrelic = require('newrelic');
require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

const Db = require('../db/db-postgres.js');
const db = new Db();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../public'));
app.use(cors());

app.get('/api/reviews', (req, res, next) => {
  db.getReviewSummaries(1, summaries => {
    res.send(summaries.map(({ _id, average, number }) => ({ itemID: _id, average, number })));
  });
});

app.get('/api/reviews/:itemID', (req, res, next) => {
  console.log(req.body);
  res.sendStatus(200);
  // db.getReviewSummary(req.params.itemID.split(','), summary => {
  //   res.send(summary);
  // });
});

app.get('/api/reviews/:itemID/details', (req, res, next) => {
  db.getReviewDetails(req.params.itemID, (err, details) => {
    if (err) {
      res.status(500)
    }
    res.send(details).status(200);
  });
});

app.get('/api/reviews/:itemID/details/:reviewID', (req, res, next) => {
  db.getSingleReview(req.params.itemID, req.params.reviewID, review => {
    res.send(review);
  });
});

app.get('/:productID', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '../', 'public/test.html'));
});

app.post('/api/reviews/:itemID', (req, res, next) => {
  let review = req.body;
  db.addReview(req.params.itemID, review, (err, review) => {
    if (err) {
      res.sendStatus(500);
    }
    res.sendStatus(201);
  });
});

app.put('/api/reviews/:reviewID', (req, res, next) => {
  let review = req.body;
  db.updateReview(req.params.reviewID, review, review => {
    res.send(review);
  });
});

app.delete('/api/reviews/:reviewID', (req, res, next) => {
  db.deleteReview(req.params.reviewID, review => {
    res.send(review);
  });
});

app.listen(3000, () => {
  console.log(`Reviews service listening`);
});
