const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');



class Db {

  addReview(productId, review, callback) {
    console.log(`Postgres - adding review for product ${productId}`);

    review = review[0];

    // get the last reviewId number
    const query = `INSERT INTO reviews (
      reviewId,
      productId,
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
      (
        10000002,
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
      try {
        const pool = new Pool({
          user: 'postgres',
          host: 'localhost',
          database: 'vikea',
          password: 'hackreactor!z',
          port: 5432,
        });

        const client = await pool.connect();
        const res = await client.query(query);
        console.log('Data insert successful');
        for (let row of res.rows) {
          console.log(row);
        }
        pool.end();
      } catch (err) {
        console.log('Postgres - ran into an error');
        console.error(err);
      }
    })();
  }
}

module.exports = Db;