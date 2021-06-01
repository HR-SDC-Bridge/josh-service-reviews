DROP KEYSPACE IF EXISTS vikea2;

CREATE KEYSPACE vikea2 WITH REPLICATION = { 'class': 'SimpleStrategy', 'replication_factor': 3};

USE vikea2;

CREATE TABLE IF NOT EXISTS reviews (
      reviewid int,
      productid int,
      overall decimal,
      easeofassembly decimal,
      valueformoney decimal,
      productquality decimal,
      appearance decimal,
      worksasexpected decimal,
      recommended boolean,
      title text,
      reviewtext text,
      reviewername text,
      reviewerid int,
      date text,
      PRIMARY KEY ((reviewid,productid), productid)
);

COPY reviews (reviewid, productid, overall, easeofassembly, valueformoney, productquality, appearance, worksasexpected, recommended, title, reviewtext, reviewername, reviewerid, date) FROM '~/Documents/Hackreactor/rpt/rpt26-sdc-bridge/melissa-reviews/sampleData/seed-data-large.csv' WITH DELIMITER=',';