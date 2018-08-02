
const db = require('../server/db');

const syncDb = () => db.sync();

syncDb();
