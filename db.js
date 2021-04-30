const defaultMongoose = require('mongoose');

class Db {
  constructor(mongoose = defaultMongoose) {
    this.mongoose = mongoose;
    const reviewSchema = new this.mongoose.Schema({
      reviewId: Number,
      productId: Number,
      overall: Number,
      easeOfAssembly: Number,
      valueForMoney: Number,
      productQuality: Number,
      appearance: Number,
      worksAsExpected: Number,
      recommended: Boolean,
      title: String,
      reviewText: String,
      reviewerName: String,
      reviewerId: Number,
      date: Date
    });

    this.Review = this.mongoose.model('Review', reviewSchema);
  }

  addReviews(reviews, callback) {
    console.log(`now adding ${reviews.length} reviews`);
    this.mongoose.connect('mongodb://localhost/vikea', { useNewUrlParser: true, useUnifiedTopology: true });
    const db = this.mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      this.Review.insertMany(reviews)
        .then(() => {
          console.log('finished inserting reviews');
          db.close();
          callback();
        });
    });
  }

  getReviewSummaries(pageNumber, callback) {
    console.log('now getting review summaries');
    this.mongoose.connect('mongodb://localhost/vikea', { useNewUrlParser: true, useUnifiedTopology: true });
    const db = this.mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      this.Review.aggregate([
        { $group: { _id: '$productId', average: { $avg: '$overall' }, number: { $sum: 1 } } },
        { $sort: { _id: 1 } },
        { $limit: 20 }
      ])
        .then(summaries => {
          console.log('finished getting review summaries');
          console.log(summaries);
          db.close();
          callback(summaries);
        });
    });
  }

  getReviewSummary(productId, callback) {
    console.log('now getting review summary for product ' + productId);
    this.mongoose.connect('mongodb://localhost/vikea', { useNewUrlParser: true, useUnifiedTopology: true });
    const db = this.mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      var agg = [
        { $match: { productId: { $in: productId.map(id => Number(id)) } } },
        { $group: { _id: '$productId', average: { $avg: '$overall' }, number: { $sum: 1 } } }
      ];
      console.log(agg);
      this.Review.aggregate(agg)
        .then(summary => {
          console.log('finished getting summary');
          db.close();
          callback(summary);
        });
    });
  }

  getReviewDetails(productId, callback) {
    console.log('getting review details for product ' + productId);
    this.mongoose.connect('mongodb://localhost/vikea', { useNewUrlParser: true, useUnifiedTopology: true });
    const db = this.mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      var agg = [
        { $match: { productId: Number(productId) } },
        {
          $group: {
            _id: '$productId',
            overall: { $avg: '$overall' },
            number: { $sum: 1 },
            easeOfAssembly: { $avg: '$easeOfAssembly' },
            valueForMoney: { $avg: '$valueForMoney' },
            appearance: { $avg: '$appearance' },
            productQuality: { $avg: '$productQuality' },
            worksAsExpected: { $avg: '$worksAsExpected' }
          }
        }
      ];
      this.Review.aggregate(agg)
        .then(averageRatings => {
          this.Review.find({ productId: Number(productId) }).limit(20)
            .then(reviews => {
              db.close();
              callback({
                itemID: Number(productId),
                averageRatings: averageRatings[0],
                page: null,
                customerReviews: reviews
              });
            });
        });
    });
  }

  getSingleReview(productId, reviewId, callback) {
    console.log('getting single review ' + reviewId + ' from product ' + productId);
    this.mongoose.connect('mongodb://localhost/vikea', { useNewUrlParser: true, useUnifiedTopology: true });
    const db = this.mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      this.Review.find({ productId: Number(productId), reviewId: Number(reviewId) })
        .then(review => {
          db.close();
          callback(review);
        });
    });
  }

  // New Database Methods

  addReview(productId, review, callback) {
    console.log(`adding review for product ${productId}`);
    this.mongoose.connect('mongodb://localhost/vikea', { useNewUrlParser: true, useUnifiedTopology: true });
    const db = this.mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      this.Review.find({}).sort({ 'reviewId': -1 }).limit(1)
        .then(lastReview => {
          let newReviewId = lastReview[0].reviewId + 1;
          review = review[0];

          const newReview = {
            reviewId: newReviewId,
            productId: productId,
            overall: review.overall,
            easeOfAssembly: review.easeOfAssembly,
            valueForMoney: review.valueForMoney,
            productQuality: review.productQuality,
            appearance: review.appearance,
            worksAsExpected: review.worksAsExpected,
            recommended: review.recommended,
            title: review.title,
            reviewText: review.reviewText,
            reviewerName: review.reviewerName,
            reviewerId: review.reviewerId,
            date: new Date()
          }

          this.Review.create(newReview)
            .then(newReview => {
              console.log(`finished adding new review id ${newReviewId}`);
              db.close();
              callback(newReview);
            })
            .catch(err => {
              console.log(`error creating new review in database,  ${err}`);
            });
        });
    });
  }

  updateReview(reviewId, review, callback) {
    console.log(`updating review ${reviewId}`);
    this.mongoose.connect('mongodb://localhost/vikea', { useNewUrlParser: true, useUnifiedTopology: true });
    const db = this.mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      this.Review.updateOne({ "reviewId": reviewId }, {
        $set: {
          overall: review[0].overall,
          easeOfAssembly: review[0].easeOfAssembly,
          valueForMoney: review[0].valueForMoney,
          productQuality: review[0].productQuality,
          appearance: review[0].appearance,
          worksAsExpected: review[0].worksAsExpected,
          recommended: review[0].recommended,
          title: review[0].title,
          reviewText: review[0].reviewText,
          reviewerName: review[0].reviewerName,
          reviewerId: review[0].reviewerId,
          date: new Date()
        }
      })
        .then(result => {
          console.log(`finished updating review id ${reviewId}`);
          db.close();
          callback(result);
        })
        .catch(err => {
          console.log(`error updating review  id ${reviewId} in database,  ${err}`);
        });
    });
  };

  deleteReview(reviewId, callback) {
    console.log(`deleting review ${reviewId}`);
    this.mongoose.connect('mongodb://localhost/vikea', { useNewUrlParser: true, useUnifiedTopology: true });
    const db = this.mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      this.Review.deleteOne({ "reviewId": reviewId })
        .then(result => {
          console.log(`finished deleting review id ${reviewId}`);
          db.close();
          callback(result);
        })
        .catch(err => {
          console.log(`error deleting review id ${reviewId} in database,  ${err}`);
        });
    });
  };
}

module.exports = Db;
