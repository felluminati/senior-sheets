
/* ************************DANGER*************************** */

/*       THIS SCRIPT EXISTS TO RESET THE USERS TABLE         */
/*                   RUN AT YOUR OWN RISK                    */

/* ************************DANGER*************************** */

const db = require('../server/db');
if (process.env.NODE_ENV !== 'production') require('../secrets');
const syncDb = async () => {
  await db.models.user.sync({force: true});
  const user = await db.models.user.create({email: 'admin@fullstackacademy.com', password: process.env.A_BIG_SECRET, isAdmin: true, isGod: true});
  const cohort = await db.models.cohort.create({name: 'staff'});
  await user.setCohort(cohort);
  console.log('Success!!!!!');
  await db.close();
};

syncDb();

