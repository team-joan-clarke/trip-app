"use strict";
// Change to this file!

const {
  db,
  models: { User, Task, Trip, User_Task, User_Trip },
} = require("./db");

const trips = [
  {
    //
    name: "Disney World",
    city: "Orlando",
    state: "Florida",
    country: "United States",
    start_date: new Date(2022, 12, 5),
    end_date: new Date(2022, 12, 7),
    status: "active",
  },
  {
    name: "Kylie's Bday",
    city: "Joshua Tree",
    state: "California",
    country: "United States",
    start_date: new Date(2023, 1, 6),
    end_date: new Date(2023, 1, 8, 23, 59, 59),
    status: "complete",
  },
  {
    name: "Mardi Gras 2023!!!",
    city: "New Orleans",
    state: "Louisiana",
    country: "United States",
    start_date: new Date(2023, 2, 15),
    end_date: new Date(2023, 2, 23, 23, 59, 59),
    status: "active",
  },
  {
    name: "Berlin",
    city: "Berlin",
    state: "Brandenburg",
    country: "Germany",
    start_date: new Date(2023, 5, 1),
    end_date: new Date(2023, 5, 8, 23, 59, 59),
    status: "active",
  },
  {
    name: "Palm Springs Trip with friends",
    city: "Palm Springs",
    state: "California",
    country: "United States",
    start_date: new Date(2023, 3, 16),
    end_date: new Date(2023, 4, 16),
    status: "active",
  },
  {
    name: "Trip to Laguna",
    city: "Laguna",
    state: "California",
    country: "United States",
    start_date: new Date(2023, 5, 16),
    end_date: new Date(2023, 6, 16),
    status: "active",
  },
  {
    name: "Trip to Tea Shop",
    city: "Brooklyn",
    state: "New York",
    country: "United States",
    start_date: new Date(2022, 12, 17),
    end_date: new Date(2022, 12, 17),
    status: "active",
  },
];
//////////////Tasks/////////////////////
const tasks = [
  {
    type: "Transportation",
    subtype: "Car Rental",
    provider_name: "Enterprise Rent-A-Car",
    due_date: "2022-11-1",
    start_date: "2022-11-5",
    end_date: "2022- 11- 7",
    start_time: "08:30:00 EST",
    end_time: "14:00:00 EST",
    checkin_time: "09:30:00 EST",
    start_location: "New York",
    end_location: "Florida",
    description: " ",
    booking_num: "2345-89",
    link: "",
    status: "in progress",
    TripId: 1,
  },
  {
    type: "Transportation",
    subtype: "Flight",
    provider_name: "Lufthansa",
    due_date: "2023-03-21 00:00:00 EST",
    start_date: "2023-05-01 00:00:00 EST",
    end_date: "2023-05-06 00:00:00 EST",
    start_time: "15:25:00 EST",
    end_time: "04:48:00 CET",
    checkin_time: "14:30:00 EST",
    start_location: "JFK, New York",
    end_location: "BER, Berlin",
    description: " ",
    booking_num: "2345-89",
    status: "complete",
    TripId: 5,
  },
  {
    type: "Activity",
    subtype: "Entertainment",
    provider_name: "Berghain",
    due_date: " 2023-04-26 00:00:00 EST",
    description: "Do you this we can get into Berghain?",
    status: "in progress",
    TripId: 5,
  },
  {
    type: "Lodging",
    due_date: "2023-04-06 00:00:00 EST",
    description: "Look for somewhere to stay in Kreuzberg area",
    status: "in progress",
    TripId: 5,
  },
  {
    type: "Dining",
    subtype: "Dinner",
    provider_name: "Nobelhart & Schmutzig",
    due_date: "2023-04-12 00:00:00 EST,",
    description: "Res at Nobelhart & Schmutzig on Thurs or Fri",
    status: "in progress",
    TripId: 5,
  },

  {
    type: "Dining",
    subtype: "Snack",
    provider_name: "Konditori Damaskus",
    due_date: "2023-04-28 00:00:00 EST",
    description: "Get deets on Konditori Damaskus",
    status: "in progress",
    TripId: 5,
  },
  {
    type: "Dining",
    subtype: "Breakfast",
    provider_name: "Cafe du Monde",
    due_date: "2023-01-30 00:00:00 EST",
    description:
      "BEIGNETS! Look into Cafe du Monde. Maybe do at night instead?",
    status: "in progress",
    TripId: 3,
  },
  {
    type: "Dining",
    subtype: "Lunch",
    provider_name: "Johnny's Poboys",
    due_date: "2023-01-30 00:00:00 EST",
    description: "Johnny's Poboys or similar--check on veggie options",
    status: "in progress",
    TripId: 3,
  },
  {
    type: "Dining",
    subtype: "Dinner",
    provider_name: "Brennan's",
    due_date: "2023-01-15 00:00:00 EST",
    start_date: "2023-02-16 00:00:00 EST",
    start_time: "16:00:00 CST",
    checkin_time: "15:55:00 CST",
    description:
      "Friday res at Brennan's in the dining room. (THE place to get Banana's Foster). Spoke to Jimmy.",
    link: "https://www.brennansneworleans.com/",
    status: "complete",
    TripId: 3,
  },
  {
    type: "Activity",
    subtype: "Other",
    provider_name: "Fifi Mahoney's",
    due_date: "2023-02-10 00:00:00 EST",
    description: "Check on when wigs will be avail for pickup",
    status: "in progress",
  },
  {
    type: "Activity",
    subtype: "Tour",
    provider_name: "Cemetery Tour",
    due_date: "2023-02-10 00:00:00 EST",
    description: "Book walking tour of one of the cemeteries?",
    status: "in progress",
    TripId: 3,
  },
  {
    type: "Transportation",
    subtype: "Flight",
    due_date: "2023-01-25 00:00:00 EST",
    description: "Book flights",
    status: "in progress",
    TripId: 3,
  },
  {
    type: "Lodging",
    provider_name: "AirBnB",
    due_date: "2022-11-30 00:00:00 PST",
    start_date: "2023-01-06 00:00:00 PST",
    end_date: "2023-01-08 23:59:59 PST",
    start_time: "18:00:00 PST",
    end_time: "11:00:00 PST",
    checkin_time: "5:00:00 PST",
    start_location: "TwentyNine Palms",
    description: "AirBnB, Host Reeyna",
    booking_num: "23458880",
    link: "https://www.airbnb.com/rooms/52567688?check_in=2023-01-11&check_out=2023-01-12&source_impression_id=p3_1669256978_TXmb8o1jH%2FBTR1Rg",
    status: "complete",
    TripId: 2,
  },
  {
    type: "Activity",
    subtype: "Entertainment",
    provider_name: "Palm Spring Strip",
    due_date: "2023-03-14 00:00:00 EST",
    description: "Explore the Palm Springs strip!",
    status: "in progress",
    TripId: 4,
  },
  {
    type: "Dining",
    subtype: "Snack",
    provider_name: "Great Shakes",
    due_date: "2023-03-14 00:00:00 EST",
    description: "Grab a sweet treat at Great Shakes",
    status: "in progress",
    TripId: 4,
  },
  {
    type: "Transportation",
    subtype: "Rental car",
    provider_name: "Expedia Rental Car",
    due_date: "2023-03-1 00:00:00 EST",
    start_date: "2023-03-12 00:00:00 EST",
    end_date: "2023-03-28 00:00:00 EST",
    start_time: "17:30:00 EST",
    end_time: "04:48:00 CET",
    checkin_time: "10:30:00 EST",
    start_location: "Los Angeles, California",
    end_location: "Palm, Springs",
    description: "Rent a car for Palm Springs trip",
    booking_num: "2385-89",
    description: "Determine route to tea shop",
    status: "complete",
    TripId: 4,
  },
  {
    type: "Lodging",
    subtype: "Book Hotel",
    provider_name: "The Marriot",
    due_date: "2022-12-17 00:00:00 EST",
    checkin_time: "10:00:00 EST",
    description: "Book hotel in Laguna Beach ",
    status: "in progress",
    TripId: 7,
  },
  {
    type: "Dining",
    subtype: "Lunch",
    provider_name: "Urth Cafe",
    due_date: "2023-05-14 00:00:00 EST",
    description: "Eat lunch at Urth Cafe",
    status: "in progress",
    TripId: 7,
  },
  {
    type: "Dining",
    subtype: "Snack",
    provider_name: "Tea shop in NYC",
    due_date: "2022-12-17 00:00:00 EST",
    description: "Enjoy some calming tea with some greatengineers!",
    status: "in progress",
    TripId: 7,
  },
  {
    type: "Transportation",
    subtype: "Subway",
    provider_name: "NYC Subway",
    due_date: "2022-12-16 00:00:00 EST,",
    description: "Determine route to tea shop",
    status: "complete",
    TripId: 7,
  },
];

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const user_trip = await Promise.all([
    User_Trip.create({
      role: "owner",
      UserId: 1,
      TripId: 1,
    }),
    User_Trip.create({
      role: "owner",
      UserId: 2,
      TripId: 5,
    }),
    User_Trip.create({
      role: "owner",
      UserId: 3,
      TripId: 7,
    }),
    User_Trip.create({
      role: "owner",
      UserId: 4,
      TripId: 4,
    }),
    User_Trip.create({
      role: "owner",
      UserId: 5,
      TripId: 2,
    }),
    User_Trip.create({
      role: "owner",
      UserId: 6,
      TripId: 3,
    }),
  ]);
  const users = await Promise.all([
    User.create({
      firstName: "Cody",
      lastName: "Pug",
      password: "123",
      email: "cody@gmail.com",
      phoneNumber: "123-123-1234",
    }),
    User.create({
      firstName: "Murphy",
      lastName: "Cat",
      password: "123",
      email: "murphyy@gmail.com",
      phoneNumber: "123-124-1234",
    }),
    User.create({
      firstName: "Lizzy",
      lastName: "Lizard",
      password: "123",
      email: "lizzy@gmail.com",
      phoneNumber: "125-123-1234",
    }),
    User.create({
      firstName: "Anahis",
      lastName: "Valenzuela",
      password: "123",
      email: "anahis@gmail.com",
      phoneNumber: "123-127-1234",
    }),
    User.create({
      firstName: "Irais",
      lastName: "Valenzuela",
      password: "123",
      email: "irais@gmail.com",
      phoneNumber: "123-128-1234",
    }),
    User.create({
      firstName: "Collin",
      lastName: "Ross",
      password: "123",
      email: "collin@gmail.com",
      phoneNumber: "123-125-1234",
    }),
    User.create({
      firstName: "Kirk",
      lastName: "Land",
      password: "123",
      email: "kirk@gmail.com",
      phoneNumber: "123-124-1234",
    }),
    User.create({
      firstName: "Yuri",
      lastName: "Valenzuela",
      password: "123",
      email: "yuri@gmail.com",
      phoneNumber: "123-123-1234",
    }),
    User.create({
      firstName: "Jacob",
      lastName: "Valenzuela",
      password: "123",
      email: "jacob@gmail.com",
      phoneNumber: "123-122-1234",
    }),
    User.create({
      firstName: "Ashley",
      lastName: "Valenzuela",
      password: "123",
      email: "ashley@gmail.com",
      phoneNumber: "123-121-1234",
    }),
    User.create({
      firstName: "Sara",
      lastName: "Foley",
      password: "pw12",
      email: "sfoley@test.com",
      phoneNumber: "321-123-1234",
    }),

    User.create({
      firstName: "Diego",
      lastName: "Ivories",
      password: "pw15",
      email: "dIvories@test.com",
      phoneNumber: "321-123-3333",
    }),

    User.create({
      firstName: "Neil",
      lastName: "Goldman",
      password: "pw45",
      email: "ngoldman@test.com",
      phoneNumber: "444-123-3333",
    }),

    User.create({
      firstName: "Tim",
      lastName: "Smith",
      password: "pw85",
      email: "tsmith@test.com",
      phoneNumber: "567-123-3333",
    }),

    User.create({
      firstName: "Jessie",
      lastName: "Canon",
      password: "pw55",
      email: "jcanon@test.com",
      phoneNumber: "567-123-3360",
    }),

    User.create({
      firstName: "Delia",
      lastName: "Harley",
      password: "pw95",
      email: "dharley@test.com",
      phoneNumber: "212-123-3333",
    }),

    User.create({
      firstName: "Elise",
      lastName: "Benjamin",
      password: "pw35",
      email: "ebenjamin@test.com",
      phoneNumber: "212-3-3333",
    }),
  ]);

  const tripsSeed = await Promise.all(
    trips.map((trip) => {
      return Trip.create(trip);
    })
  );

  const tasksSeed = await Promise.all(
    tasks.map((task) => {
      return Task.create(task);
    })
  );

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  //   return users;
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
