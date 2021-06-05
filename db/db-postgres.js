const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

class Db {

  addReview(productId, review, callback) {
    console.log(`Postgres - adding review for product ${productId}`);
    review = review[0];

    const query = `INSERT INTO reviews (
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
      ( ${productId},
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
          user: process.env.DB_USER,
          host: process.env.DB_HOST,
          database: process.env.DB_DATABASE,
          password: process.env.DB_PASSWORD,
          port: process.env.DB_PORT,
        });

        const client = await pool.connect();
        const res = await client.query(query);
        console.log('Data insert successful');
        for (let row of res.rows) {
          console.log(row);
        }
        callback(null, res.rows);
        client.release();
      } catch (err) {
        console.log('Postgres - ran into an error');
        console.error(err);
        callback(err, null);
      }
    })();
  }

  getReviewDetails(productId, callback) {
    console.log('getting review details for product ' + productId);

    let query = `SELECT SUM(1) AS number, AVG(overall) AS overall, AVG(easeOfAssembly) AS "easeOfAssembly", AVG(valueformoney) AS "valueForMoney", AVG(productquality) AS "productQuality", AVG(appearance) AS appearance, AVG(worksasexpected) AS "worksAsExpected" FROM reviews WHERE productid = ${productId} GROUP BY productid`;

    (async () => {
      try {
        const pool = new Pool({
          user: process.env.DB_USER,
          host: process.env.DB_HOST,
          database: process.env.DB_DATABASE,
          password: process.env.DB_PASSWORD,
          port: process.env.DB_PORT,
        });

        const client = await pool.connect();
        const res = await client.query(query);

        const reviews = await client.query(`SELECT overall, easeofassembly AS "easeOfAssembly", valueformoney AS "valueForMoney", productquality AS "productQuality", appearance, worksasexpected AS "worksAsExpected", recommended, title, reviewtext AS "reviewText", reviewername AS "reviewerName", date FROM reviews WHERE productid = ${productId} LIMIT 20`);

        client.release();
        callback(null, {
          itemID: Number(productId),
          averageRatings: res.rows[0],
          page: null,
          customerReviews: reviews.rows
        });

      } catch (err) {
        console.error(err);
        callback(err, null);
      }
    })();
  }
}

module.exports = Db;