DROP KEYSPACE IF EXISTS vikea;

CREATE KEYSPACE vikea WITH REPLICATION = { 'class': 'SimpleStrategy', 'replication_factor': 1};

USE vikea;

CREATE TABLE IF NOT EXISTS reviews (
      reviewid int PRIMARY KEY,
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
      date text
);

COPY reviews (reviewid, productid, overall, easeofassembly, valueformoney, productquality, appearance, worksasexpected, recommended, title, reviewtext, reviewername, reviewerid, date) FROM '~/Documents/Hackreactor/rpt/rpt26-sdc-bridge/melissa-reviews/sampleData/seed-data-large.csv' WITH DELIMITER=',';