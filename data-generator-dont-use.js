const faker = require('faker');
const fs = require('fs');
//const data = require('./sampleData/data.js');

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function generateReview(productId, reviewId) {
  var reviewerName = `${faker.name.firstName()} ${faker.name.lastName()}`;
  var title = faker.lorem.words();
  var reviewText = faker.lorem.sentence();
  var overall = Math.ceil(Math.random() * 50) / 10;
  var anchor = 10 * (overall < 1.25 ? 0 : overall > 3.75 ? 2.5 : overall - 1.25);
  var recommended = Math.random() < overall / 5;
  var subScore = function () {
    return Math.round(anchor + Math.ceil(Math.random() * 25)) / 10;
  };

  return {
    reviewId,
    productId,
    overall,
    easeOfAssembly: subScore(),
    valueForMoney: subScore(),
    productQuality: subScore(),
    appearance: subScore(),
    worksAsExpected: subScore(),
    recommended,
    title,
    reviewText,
    reviewerName,
    reviewerId: reviewId,
    date: faker.date.recent()
  };
};

function generateReviews(n) {
  let reviewId = 1;

  let columnHeaders = 'reviewId, productId, overall, easeOfAssembly, valueForMoney, productQuality, appearance, worksAsExpected, recommended, title, reviewText, reviewerName, reviewerId, date \n';
  fs.appendFile('./sampleData/data-generator.csv', columnHeaders, err => {
    if (err) {
      console.error(err);
      return;
    }
  });

  for (var i = 1; i <= n; i++) {
    let review = generateReview(i, reviewId);
    let line = `${review.reviewId}, ${review.productId}, ${review.overall}, ${review.easeOfAssembly}, ${review.valueForMoney}, ${review.productQuality}, ${review.appearance}, ${review.worksAsExpected}, ${review.recommended}, ${review.title}, ${review.reviewText}, ${review.reviewerName}, ${review.reviewerId}, ${review.date} + \n`
    fs.appendFileSync('./sampleData/data-generator.csv', line, err => {
      if (err) {
        console.error(err);
        return;
      }
    });
    reviewId++;
  }
}


var start = Date.now();
generateReviews(1000000);

var millis = Date.now() - start;
console.log(`seconds elapsed = ${Math.floor(millis) / 1000}`);