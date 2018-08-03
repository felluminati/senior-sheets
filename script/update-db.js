
/* ************************DANGER*************************** */

/*       THIS SCRIPT EXISTS TO RESET THE USERS TABLE         */
/*                   RUN AT YOUR OWN RISK                    */

/* ************************DANGER*************************** */


const db = require('../server/db');
const syncDb = async () => {
  await db.models.user.sync({force: true});
  // await db.models.user.create({}) maybe make a dog user in this script file!
  console.log('Success!!!!!');
  await db.close();
};

syncDb();

