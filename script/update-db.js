
/* ************************DANGER*************************** */

/*       THIS SCRIPT EXISTS TO RESET THE USERS TABLE         */
/*                   RUN AT YOUR OWN RISK                    */

/* ************************DANGER*************************** */


const db = require('../server/db');
const syncDb = async () => {
  await db.models.user.sync({force: true});
  await db.models.create({email: 'admin@fullstackacademy.com', password: 'Ch@rleyAur0raK3vin', isAdmin: true, isGod: true});
  console.log('Success!!!!!');
  await db.close();
};

syncDb();

