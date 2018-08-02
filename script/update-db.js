
const db = require('../server/db');

const syncDb = async () => {
  await db.sync();
  await db.close();
  console.log('Success!!!!!');
};


syncDb();

