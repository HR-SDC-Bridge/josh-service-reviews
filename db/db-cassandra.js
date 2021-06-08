const cassandra = require('cassandra-driver');

class Db {

  addReview(productId, review, callback) {
    console.log(`Cassandra - adding review for product ${productId}`);
    review = review[0];

    const query = `INSERT INTO reviews (
      reviewid,
      productid,
      overall,
      easeOfAssembly,
      valueForMoney,
      productQuality,
      appearance,
      worksAsExpected,
      recommended,
      title,
      reviewtext,
      reviewername,
      reviewerid,
      date
      )
      VALUES
      ( 160000000,
        ${productId},
        ${review.overall},
        ${review.easeOfAssembly},
        ${review.valueForMoney},
        ${review.productQuality},
        ${review.appearance},
        ${review.worksAsExpected},
        ${review.recommended},
        '${review.title}',
        '${review.reviewText}',
        '${review.reviewerName}',
        ${review.reviewerId},
        '${new Date()}'
        )`;

    (async () => {
      const client = new cassandra.Client({
        contactPoints: ['127.0.0.1'],
        localDataCenter: 'datacenter1',
        keyspace: 'vikea'
      });

      await client.connect();
      await client.execute(query)
        .then(res => {
          callback();
          client.shutdown();
        })
        .catch(err => {
          console.log('Cassandra - error adding review');
          console.error(err);
        });
    })();
  }

  getSingleReview(productId, reviewId, callback) {
    console.log('getting single review ' + reviewId + ' from product ' + productId);

    (async () => {
      const client = new cassandra.Client({
        contactPoints: ['127.0.0.1'],
        localDataCenter: 'datacenter1',
        keyspace: 'vikea'
      });

      let query = `SELECT * FROM reviews WHERE reviewid=${reviewId}`;
      await client.connect();
      await client.execute(query)
        .then(res => {
          callback();
          client.shutdown();
        })
        .catch(err => {
          console.log('Cassandra - error adding review');
          console.error(err);
        });
    })();

  }

  // getReviewDetails(productId, callback) {
  //   console.log('getting review details for product ' + productId);

  //   let query = `SELECT COUNT(1) AS number, AVG(overall) AS overall, AVG(easeOfAssembly) AS "easeOfAssembly", AVG(valueformoney) AS "valueForMoney", AVG(productquality) AS "productQuality", AVG(appearance) AS appearance, AVG(worksasexpected) AS "worksAsExpected" FROM reviews WHERE productid = ${productId} GROUP BY reviewid ALLOW FILTERING`;

  //   (async () => {
  //     const client = new cassandra.Client({
  //       contactPoints: ['127.0.0.1'],
  //       localDataCenter: 'datacenter1',
  //       keyspace: 'vikea'
  //     });

  //     await client.connect();

  //     await client.execute(query)
  //       .then(res => {

  //         // const reviews = await client.execute(`SELECT overall, easeofassembly AS "easeOfAssembly", valueformoney AS "valueForMoney", productquality AS "productQuality", appearance, worksasexpected AS "worksAsExpected", recommended, title, reviewtext AS "reviewText", reviewername AS "reviewerName", date FROM reviews WHERE productid = ${productId} LIMIT 20`);

  //         callback({
  //           itemID: Number(productId),
  //           averageRatings: res.rows[0],
  //           page: null,
  //           //customerReviews: reviews.rows
  //         });
  //         client.shutdown();
  //       })
  //       .catch(err => {
  //         console.log('Cassandra - error adding review');
  //         console.error(err);
  //       });
  //   })();
  // }
}

module.exports = Db;