'use strict';

const db = require('../server/db');
const {User, Cohort} = require('../server/db/models');

async function seed() {
  await db.sync({force: true});
  console.log('db synced!');

  const user = await User.create({email: 'admin@fullstackacademy.com', password: 'password', isAdmin: true, isGod: true});
  const cohort = await Cohort.create({name: 'staff'});
  await user.setCohort(cohort);
  console.log(`seeded successfully`);
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
