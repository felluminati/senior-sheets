'use strict';

const db = require('../server/db');
const {User, Cohort} = require('../server/db/models');

async function seed() {
  await db.sync({force: true});
  console.log('db synced!');

  await User.create({email: 'admin@email.com', password: 'F3lluminatie$'});
  const cohorts = await Promise.all([
    Cohort.create({name: 1806}),
    Cohort.create({name: 1808})
  ]);
  console.log(`seeded ${cohorts.length} cohorts`);

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
