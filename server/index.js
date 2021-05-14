const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

// Mongoose
//const Db = require('../db');
//const db = new Db();

// Postgres
const Db = require('../db/db-postgres.js');
const db = new Db();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../public'));
app.use(cors());

app.get('/api/reviews', (req, res, next) => {
  db.getReviewSummaries(1, summaries => {
    console.log('got summaries');
    res.send(summaries.map(({ _id, average, number }) => ({ itemID: _id, average, number })));
  });
});

app.get('/api/reviews/:itemID', (req, res, next) => {
  console.log('about to get summary');
  console.log(req.params.itemID);
  db.getReviewSummary(req.params.itemID.split(','), summary => {
    res.send(summary);
  });
});

app.get('/api/reviews/:itemID/details', (req, res, next) => {
  console.log('about to get details');
  var start = new Date().getTime();
  db.getReviewDetails(req.params.itemID, details => {
    var elapsed = new Date().getTime() - start;
    res.send(details);
    console.log(`TIME - getReview: ${elapsed} ms`);
  });
});

app.get('/api/reviews/:itemID/details/:reviewID', (req, res, next) => {
  console.log('now getting one single review');
  db.getSingleReview(req.params.itemID, req.params.reviewID, review => {
    res.send(review);
  });
});

app.get('/:productID', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '../', 'public/test.html'));
});

// Add Review
app.post('/api/reviews/:itemID', (req, res, next) => {
  console.log('adding new review');
  var start = new Date().getTime();
  let review = req.body;
  db.addReview(req.params.itemID, review, review => {
    var elapsed = new Date().getTime() - start;
    res.send(review).status(200);
    console.log(`TIME - addReview: ${elapsed} ms`);
  });
});

// Update Review
app.put('/api/reviews/:reviewID', (req, res, next) => {
  console.log('updating review');
  let review = req.body;
  db.updateReview(req.params.reviewID, review, review => {
    res.send(review);
  });
});

// Delete Review
app.delete('/api/reviews/:reviewID', (req, res, next) => {
  console.log('deleting review');
  db.deleteReview(req.params.reviewID, review => {
    res.send(review);
  });
});

app.listen(3000, () => console.log('listening'));
