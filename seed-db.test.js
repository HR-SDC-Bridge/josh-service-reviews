const Db = require('./db');
const mockMongoose = require('./mock-mongoose');
const db = new Db(mockMongoose);

require('./seed-db')(() => { }, db);
