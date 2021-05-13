const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'vikea',
  password: 'hackreactor!z',
  port: 5432,
});

let fileReadStream = fs.createReadStream(path.join(__dirname, 'seed-data-test.csv'));
let filepath = path.join(__dirname, '..', 'sampleData', 'seed-data-large.csv');

let query = `COPY reviews(reviewId, productId, overall, easeOfAssembly, valueForMoney, productQuality, appearance, worksAsExpected, recommended, title, reviewText, reviewerName, reviewerId, date)
FROM '${filepath}'
DELIMITER ','`;

console.log(filepath);
console.log(query);

(async () => {
  try {
    const client = await pool.connect();
    const res = await client.query(query);

    console.log(res.rowCount, 'rows successfully added');
    client.end();
  } catch (err) {
    console.error(err);
  }
})();