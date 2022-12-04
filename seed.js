"use strict";

const {
  db,
  models: { User, Task, Trip, User_Task, User_Trip },
} = require("./db");

// PERSISTENT THROUGH TABLE SEEDING UTIL FNS
async function getUIDByEmail(email) {
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      return user.id;
    } else {
      console.log(
        new Error(`Error seeding db: Could not find user with email ${email}`)
      );
    }
  } catch (error) {
    console.log(new Error("Error seeding db: Could not fetch userId"));
  }
}
async function getTRIDByName(name) {
  try {
    const trip = await Trip.findOne({ where: { name: name } });
    if (trip) {
      return trip.id;
    } else {
      console.log(
        new Error(`Error seeding db: Could not find trip with name ${title}`)
      );
    }
  } catch (error) {
    console.log(new Error("Error seeding db: Could not fetch tripId"));
  }
}

async function getTAIDByName(name) {
  try {
    const task = await Task.findOne({ where: { provider_name: name } });
    if (task) {
      return task.id;
    } else {
      console.log(
        new Error(`Error seeding db: Could not find task with name ${title}`)
      );
    }
  } catch (error) {
    console.log(new Error("Error seeding db: Could not fetch taskId"));
  }
}

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
    imageUrl:
      "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1300/2304/75/vision-dam/digital/parks-platform/parks-global-assets/disney-world/attractions/cinderella-castle/cinderella-castle-2x1.jpg?2022-03-10T19:40:10+00:00",
  },
  {
    name: "Kylie's Bday",
    city: "Joshua Tree",
    state: "California",
    country: "United States",
    start_date: new Date(2023, 1, 6),
    end_date: new Date(2023, 1, 8),
    status: "active",
    imageUrl:
      "http://www.nwf.org/-/media/NEW-WEBSITE/Shared-Folder/Wildlife/Plants-and-Fungi/plant_joshua-tree_KiskaMedia-GettyImages_600x300.ashx",
  },
  {
    name: "Mardi Gras 2023!!!",
    city: "New Orleans",
    state: "Louisiana",
    country: "United States",
    start_date: new Date(2023, 1, 15),
    end_date: new Date(2023, 1, 23),
    status: "complete",
    imageUrl:
      "https://www.worldatlas.com/r/w768/upload/25/75/5e/shutterstock-390717274.jpg",
  },
  {
    name: "Berlin",
    city: "Berlin",
    state: "Brandenburg",
    country: "Germany",
    start_date: new Date(2023, 5, 1),
    end_date: new Date(2023, 5, 8),
    status: "active",
    imageUrl: "https://media.timeout.com/images/105303515/image.jpg",
  },
  {
    name: "Palm Springs Trip with friends",
    city: "Palm Springs",
    state: "California",
    country: "United States",
    start_date: new Date(2023, 3, 16),
    end_date: new Date(2023, 4, 16),
    status: "active",
    imageUrl:
      "https://media.cntraveler.com/photos/605cfa959d9a95de47693340/1:1/w_3692,h_3692,c_limit/T24Y1F.jpg",
  },
  {
    name: "Trip to Laguna",
    city: "Laguna",
    state: "California",
    country: "United States",
    start_date: new Date(2023, 5, 16),
    end_date: new Date(2023, 6, 16),
    status: "active",
    imageUrl:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/7b/c0/bf/laguna-beach.jpg?w=600&h=400&s=1",
  },
  {
    name: "Trip to Tea Shop",
    city: "Brooklyn",
    state: "New York",
    country: "United States",
    start_date: new Date(2022, 12, 17),
    end_date: new Date(2022, 12, 17),
    status: "complete",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTO1y52-cuFMKc2cVCwlBsLPqfr-rC_MTPWg&usqp=CAU",
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

  const users = await Promise.all([
    User.create({
      firstName: "Cody",
      lastName: "Pug",
      username: "cody",
      password: "123",
      email: "cody@trippntest.com",
      phoneNumber: "123-123-1234",
    }),
    User.create({
      firstName: "Murphy",
      lastName: "Cat",
      username: "murphy",
      password: "123",
      email: "murphyy@trippntest.com",
      phoneNumber: "123-124-1234",
    }),
    User.create({
      firstName: "Lizzy",
      lastName: "Lizard",
      username: "lizzy",
      password: "123",
      email: "lizzy@trippntest.com",
      phoneNumber: "125-123-1234",
    }),
    User.create({
      firstName: "Anahis",
      lastName: "Valenzuela",
      username: "anahis",
      password: "123",
      email: "anahis@gmail.com",
      phoneNumber: "123-127-1234",
    }),
    User.create({
      firstName: "Irais",
      lastName: "Valenzuela",
      username: "irais",
      password: "123",
      email: "irais@gmail.com",
      phoneNumber: "123-128-1234",
    }),
    User.create({
      firstName: "Collin",
      lastName: "Ross",
      username: "collin",
      password: "123",
      email: "collin@trippntest.com",
      phoneNumber: "123-125-1234",
    }),
    User.create({
      firstName: "Kirk",
      lastName: "Land",
      username: "kirk",
      password: "123",
      email: "kirk@trippntest.com",
      phoneNumber: "123-124-1234",
    }),
    User.create({
      firstName: "Yuri",
      lastName: "Valenzuela",
      username: "yuri",
      password: "123",
      email: "yuri@trippntest.com",
      phoneNumber: "123-123-1234",
    }),
    User.create({
      firstName: "Jacob",
      lastName: "Valenzuela",
      username: "jacob",
      password: "123",
      email: "jacob@trippntest.com",
      phoneNumber: "123-122-1234",
    }),
    User.create({
      firstName: "Ashley",
      lastName: "Valenzuela",
      username: "ashley",
      password: "123",
      email: "ashley@trippntest.com",
      phoneNumber: "123-121-1234",
    }),
    User.create({
      firstName: "Sara",
      lastName: "Foley",
      username: "sara",
      password: "pw12",
      email: "sfoley@trippntest.com",
      phoneNumber: "321-123-1234",
    }),

    User.create({
      firstName: "Diego",
      lastName: "Ivories",
      username: "diego",
      password: "pw15",
      email: "dIvories@trippntest.com",
      phoneNumber: "321-123-3333",
    }),

    User.create({
      firstName: "Neil",
      lastName: "Goldman",
      username: "neil",
      password: "pw45",
      email: "ngoldman@trippntest.com",
      phoneNumber: "444-123-3333",
    }),

    User.create({
      firstName: "Tim",
      lastName: "Smith",
      username: "tim",
      password: "pw85",
      email: "tsmith@trippntest.com",
      phoneNumber: "567-123-3333",
    }),

    User.create({
      firstName: "Jessie",
      lastName: "Canon",
      username: "jessie",
      password: "pw55",
      email: "jcanon@trippntest.com",
      phoneNumber: "567-123-3360",
    }),

    User.create({
      firstName: "Delia",
      lastName: "Harley",
      username: "delia",
      password: "pw95",
      email: "dharley@trippntest.com",
      phoneNumber: "212-123-3333",
    }),

    User.create({
      firstName: "Elise",
      lastName: "Benjamin",
      username: "elise",
      password: "pw35",
      email: "ebenjamin@trippntest.com",
      phoneNumber: "212-3-3333",
    }),
  ]);

  await Promise.all(
    trips.map((trip) => {
      return Trip.create(trip);
    })
  );

  const berlin = await getTRIDByName("Berlin");
  const mardigras = await getTRIDByName("Mardi Gras 2023!!!");
  const disney = await getTRIDByName("Disney World");
  const palmsprings = await getTRIDByName("Palm Springs Trip with friends");
  const laguna = await getTRIDByName("Trip to Laguna");
  const teashop = await getTRIDByName("Trip to Tea Shop");
  const joshuatree = await getTRIDByName("Kylie's Bday");

  const tasks = [
    {
      type: "Transportation",
      subtype: "Car",
      provider_name: "Enterprise Rent-A-Car",
      due_date: new Date(2022, 11, 1),
      start_date: new Date(2022, 11, 5, 0, 0, 0),
      end_date: new Date(2022, 11, 7, 0, 0, 0),
      start_location: "New York",
      end_location: "Florida",
      booking_num: "2345-89",
      status: "in progress",
      TripId: disney,
    },
    {
      type: "Transportation",
      subtype: "Flight",
      provider_name: "Lufthansa",
      due_date: new Date(2023, 3, 21),
      start_date: new Date(2023, 5, 1, 0, 0, 0),
      end_date: new Date(2023, 5, 6, 0, 0, 0),
      start_location: "JFK, New York",
      end_location: "BER, Berlin",
      booking_num: "2345-89",
      status: "complete",
      TripId: berlin,
    },
    {
      type: "Activity",
      subtype: "Entertainment",
      provider_name: "Berghain",
      due_date: new Date(2023, 4, 26),
      description: "Do you this we can get into Berghain?",
      status: "in progress",
      TripId: berlin,
    },
    {
      type: "Lodging",
      subtype: "Private Rental",
      provider_name: "tbd",
      due_date: new Date(2023, 4, 6),
      description: "Look for somewhere to stay in Kreuzberg area",
      status: "in progress",
      TripId: berlin,
    },
    {
      type: "Dining",
      subtype: "Dinner",
      provider_name: "Nobelhart & Schmutzig",
      due_date: new Date(2023, 4, 12),
      description: "Res at Nobelhart & Schmutzig on Thurs or Fri",
      status: "in progress",
      TripId: berlin,
    },

    {
      type: "Dining",
      subtype: "Snack",
      provider_name: "Konditori Damaskus",
      due_date: new Date(2023, 4, 28),
      description: "Get deets on Konditori Damaskus",
      status: "in progress",
      TripId: berlin,
    },
    {
      type: "Dining",
      subtype: "Breakfast",
      provider_name: "Cafe du Monde",
      due_date: new Date(2023, 1, 30),
      description:
        "BEIGNETS! Look into Cafe du Monde. Maybe do at night instead?",
      status: "in progress",
      TripId: mardigras,
    },
    {
      type: "Dining",
      subtype: "Lunch",
      provider_name: "Johnny's Poboys",
      due_date: new Date(2023, 1, 30),
      description: "Johnny's Poboys or similar--check on veggie options",
      status: "in progress",
      TripId: mardigras,
    },
    {
      type: "Dining",
      subtype: "Dinner",
      provider_name: "Brennan's",
      due_date: new Date(2023, 1, 15),
      start_date: new Date(2023, 2, 16, 15, 55),
      description:
        "Friday res at Brennan's in the dining room. (THE place to get Banana's Foster). Spoke to Jimmy.",
      link: "https://www.brennansneworleans.com/",
      status: "complete",
      TripId: mardigras,
    },
    {
      type: "Activity",
      subtype: "Other",
      provider_name: "Fifi Mahoney's",
      due_date: new Date(2023, 2, 10),
      description: "Check on when wigs will be avail for pickup",
      status: "in progress",
      TripId: mardigras,
    },
    {
      type: "Activity",
      subtype: "Tour",
      provider_name: "Cemetery Tour",
      due_date: new Date(2023, 2, 10),
      start_date: new Date(2023, 2, 16, 12, 15),
      description: "Book walking tour of one of the cemeteries?",
      status: "complete",
      TripId: mardigras,
    },
    {
      type: "Transportation",
      subtype: "Flight",
      provider_name: "T.B.D.",
      due_date: new Date(2023, 1, 25),
      description: "Book flights",
      status: "in progress",
      TripId: mardigras,
    },
    {
      type: "Lodging",
      subtype: "Private Rental",
      provider_name: "AirBnB",
      due_date: new Date(2022, 11, 30),
      start_date: new Date(2023, 1, 6, 0, 0, 0),
      end_date: new Date(2023, 1, 8, 0, 0, 0),
      start_location: "TwentyNine Palms",
      description: "AirBnB, Host Reeyna",
      booking_num: "23458880",
      link: "https://www.airbnb.com/rooms/52567688?check_in=2023-01-11&check_out=2023-01-12&source_impression_id=p3_1669256978_TXmb8o1jH%2FBTR1Rg",
      status: "complete",
      TripId: joshuatree,
    },
    {
      type: "Activity",
      subtype: "Entertainment",
      provider_name: "Palm Spring Strip",
      due_date: new Date(2023, 3, 14),
      description: "Explore the Palm Springs strip!",
      status: "in progress",
      TripId: palmsprings,
    },
    {
      type: "Dining",
      subtype: "Snack",
      provider_name: "Great Shakes",
      due_date: new Date(2023, 3, 14),
      description: "Grab a sweet treat at Great Shakes",
      status: "in progress",
      TripId: palmsprings,
    },
    {
      type: "Transportation",
      subtype: "Car",
      provider_name: "Expedia Rental Car",
      due_date: new Date(2023, 3, 1),
      start_date: new Date(2023, 3, 12, 0, 0, 0),
      end_date: new Date(2023, 3, 28, 0, 0, 0),
      start_location: "Los Angeles, California",
      end_location: "Palm, Springs",
      description: "Rent a car for Palm Springs trip",
      booking_num: "2385-89",
      status: "complete",
      TripId: palmsprings,
    },
    {
      type: "Lodging",
      subtype: "Hotel",
      provider_name: "The Marriot",
      due_date: new Date(2022, 12, 17),
      description: "Book hotel in Laguna Beach ",
      status: "in progress",
      TripId: laguna,
    },
    {
      type: "Dining",
      subtype: "Lunch",
      provider_name: "Urth Cafe",
      due_date: new Date(2023, 5, 14),
      description: "Eat lunch at Urth Cafe",
      status: "in progress",
      TripId: laguna,
    },
    {
      type: "Dining",
      subtype: "Snack",
      provider_name: "Tea shop in NYC",
      due_date: new Date(2022, 12, 17),
      description: "Enjoy some calming tea with some greatengineers!",
      status: "in progress",
      TripId: teashop,
    },
    {
      type: "Transportation",
      subtype: "Public Transportation",
      provider_name: "NYC Subway",
      due_date: new Date(2022, 12, 16),
      description: "Determine route to tea shop",
      status: "complete",
      TripId: teashop,
    },
    {
      type: "Activity",
      subtype: "Entertainment",
      provider_name: "Tipitina's",
      due_date: new Date(2023, 2, 10),
      start_date: new Date(2023, 2, 17, 20, 30),
      description: "mix of country and jazz",
      status: "complete",
      TripId: mardigras,
    },
  ];

  await Promise.all(
    tasks.map((task) => {
      return Task.create(task);
    })
  );
  const irais = await getUIDByEmail("irais@gmail.com");
  const anahis = await getUIDByEmail("anahis@gmail.com");
  const murphy = await getUIDByEmail("murphyy@trippntest.com");
  const cody = await getUIDByEmail("cody@trippntest.com");
  const collin = await getUIDByEmail("collin@trippntest.com");
  const kirk = await getUIDByEmail("kirk@trippntest.com");
  const yuri = await getUIDByEmail("yuri@trippntest.com");
  const lizzy = await getUIDByEmail("lizzy@trippntest.com");
  const ashley = await getUIDByEmail("ashley@trippntest.com");
  const neil = await getUIDByEmail("ngoldman@trippntest.com");
  const diego = await getUIDByEmail("dIvories@trippntest.com");
  const jacob = await getUIDByEmail("jacob@trippntest.com");
  const tim = await getUIDByEmail("tsmith@trippntest.com");
  const sara = await getUIDByEmail("sfoley@trippntest.com");
  const jessie = await getUIDByEmail("jcanon@trippntest.com");
  const delia = await getUIDByEmail("dharley@trippntest.com");
  const elise = await getUIDByEmail("ebenjamin@trippntest.com");

  await Promise.all([
    User_Trip.create({
      role: "owner",
      UserId: jessie,
      TripId: joshuatree,
    }),
    User_Trip.create({
      role: "editor",
      UserId: sara,
      TripId: joshuatree,
    }),
    User_Trip.create({
      role: "owner",
      UserId: sara,
      TripId: berlin,
    }),
    User_Trip.create({
      role: "editor",
      UserId: delia,
      TripId: berlin,
    }),
    User_Trip.create({
      role: "editor",
      UserId: tim,
      TripId: berlin,
    }),
    User_Trip.create({
      role: "attendee",
      UserId: jessie,
      TripId: berlin,
    }),
    User_Trip.create({
      role: "attendee",
      UserId: elise,
      TripId: berlin,
    }),
    User_Trip.create({
      role: "owner",
      UserId: anahis,
      TripId: teashop,
    }),
    User_Trip.create({
      role: "editor",
      UserId: irais,
      TripId: teashop,
    }),
    User_Trip.create({
      role: "owner",
      UserId: ashley,
      TripId: disney,
    }),
    User_Trip.create({
      role: "editor",
      UserId: yuri,
      TripId: disney,
    }),
    User_Trip.create({
      role: "attendee",
      UserId: cody,
      TripId: disney,
    }),
    User_Trip.create({
      role: "attendee",
      UserId: murphy,
      TripId: disney,
    }),
    User_Trip.create({
      role: "owner",
      UserId: anahis,
      TripId: palmsprings,
    }),
    User_Trip.create({
      role: "editor",
      UserId: yuri,
      TripId: palmsprings,
    }),
    User_Trip.create({
      role: "attendee",
      UserId: jacob,
      TripId: palmsprings,
    }),
    User_Trip.create({
      role: "owner",
      UserId: lizzy,
      TripId: mardigras,
    }),
    User_Trip.create({
      role: "editor",
      UserId: neil,
      TripId: mardigras,
    }),
    User_Trip.create({
      role: "attendee",
      UserId: diego,
      TripId: mardigras,
    }),
    User_Trip.create({
      role: "owner",
      UserId: kirk,
      TripId: laguna,
    }),
    User_Trip.create({
      role: "editor",
      UserId: tim,
      TripId: laguna,
    }),
    User_Trip.create({
      role: "attendee",
      UserId: murphy,
      TripId: laguna,
    }),
  ]);

  // DISNEY
  const enterprise = await getTAIDByName("Enterprise Rent-A-Car");
  // BERLIN
  const lufthansa = await getTAIDByName("Lufthansa");
  const berghain = await getTAIDByName("Berghain");
  const tbdLodging = await getTAIDByName("tbd");
  const nobelhart = await getTAIDByName("Nobelhart & Schmutzig");
  const konditori = await getTAIDByName("Konditori Damaskus");
  // MARDI GRAS
  const cafedumonde = await getTAIDByName("Cafe du Monde");
  const johnnys = await getTAIDByName("Johnny's Poboys");
  const brennans = await getTAIDByName("Brennan's");
  const fifimahoney = await getTAIDByName("Fifi Mahoney's");
  const cemeterytour = await getTAIDByName("Cemetery Tour");
  const tbdFlight = await getTAIDByName("T.B.D.");
  const tipitinas = await getTAIDByName("Tipitina's");
  // KYLE'S BDAY
  const airBnB = await getTAIDByName("AirBnB");
  // PALM SPRINGS
  const palmspringsstrip = await getTAIDByName("Palm Spring Strip");
  const greatshakes = await getTAIDByName("Great Shakes");
  // LAGUNA
  const expediacar = await getTAIDByName("Expedia Rental Car");
  const marriot = await getTAIDByName("The Marriot");
  const urthcafe = await getTAIDByName("Urth Cafe");
  // TEA SHOP
  const teatime = await getTAIDByName("Tea shop in NYC");
  const nycsubway = await getTAIDByName("NYC Subway");

  await Promise.all([
    User_Task.create({
      role: "editor",
      UserId: ashley,
      TaskId: enterprise,
    }),
    User_Task.create({
      role: "attendee",
      UserId: murphy,
      TaskId: 1,
    }),
    User_Task.create({
      role: "editor",
      UserId: sara,
      TaskId: lufthansa,
    }),
    User_Task.create({
      role: "attendee",
      UserId: jessie,
      TaskId: lufthansa,
    }),
    User_Task.create({
      role: "attendee",
      UserId: elise,
      TaskId: lufthansa,
    }),
    User_Task.create({
      role: "editor",
      UserId: tim,
      TaskId: berghain,
    }),
    User_Task.create({
      role: "editor",
      UserId: sara,
      TaskId: berghain,
    }),
    User_Task.create({
      role: "attendee",
      UserId: elise,
      TaskId: berghain,
    }),
    User_Task.create({
      role: "editor",
      UserId: delia,
      TaskId: tbdLodging,
    }),
    User_Task.create({
      role: "attendee",
      UserId: tim,
      TaskId: tbdLodging,
    }),
    User_Task.create({
      role: "editor",
      UserId: tim,
      TaskId: nobelhart,
    }),
    User_Task.create({
      role: "attendee",
      UserId: jessie,
      TaskId: nobelhart,
    }),
    User_Task.create({
      role: "attendee",
      UserId: elise,
      TaskId: nobelhart,
    }),
    User_Task.create({
      role: "editor",
      UserId: sara,
      TaskId: konditori,
    }),
    User_Task.create({
      role: "attendee",
      UserId: delia,
      TaskId: konditori,
    }),
    User_Task.create({
      role: "attendee",
      UserId: elise,
      TaskId: konditori,
    }),
    User_Task.create({
      role: "editor",
      UserId: neil,
      TaskId: cafedumonde,
    }),
    User_Task.create({
      role: "attendee",
      UserId: lizzy,
      TaskId: cafedumonde,
    }),
    User_Task.create({
      role: "attendee",
      UserId: diego,
      TaskId: cafedumonde,
    }),
    User_Task.create({
      role: "editor",
      UserId: neil,
      TaskId: johnnys,
    }),
    User_Task.create({
      role: "attendee",
      UserId: lizzy,
      TaskId: johnnys,
    }),
    User_Task.create({
      role: "attendee",
      UserId: diego,
      TaskId: johnnys,
    }),
    User_Task.create({
      role: "editor",
      UserId: lizzy,
      TaskId: brennans,
    }),
    User_Task.create({
      role: "attendee",
      UserId: neil,
      TaskId: brennans,
    }),
    User_Task.create({
      role: "attendee",
      UserId: diego,
      TaskId: brennans,
    }),
    User_Task.create({
      role: "editor",
      UserId: lizzy,
      TaskId: fifimahoney,
    }),
    User_Task.create({
      role: "editor",
      UserId: neil,
      TaskId: cemeterytour,
    }),
    User_Task.create({
      role: "attendee",
      UserId: diego,
      TaskId: cemeterytour,
    }),
    User_Task.create({
      role: "editor",
      UserId: neil,
      TaskId: tipitinas,
    }),
    User_Task.create({
      role: "editor",
      UserId: neil,
      TaskId: tbdFlight,
    }),
    User_Task.create({
      role: "editor",
      UserId: jessie,
      TaskId: airBnB,
    }),
    User_Task.create({
      role: "attendee",
      UserId: sara,
      TaskId: airBnB,
    }),
    User_Task.create({
      role: "editor",
      UserId: anahis,
      TaskId: palmspringsstrip,
    }),
    User_Task.create({
      role: "attendee",
      UserId: yuri,
      TaskId: palmspringsstrip,
    }),
    User_Task.create({
      role: "attendee",
      UserId: jacob,
      TaskId: palmspringsstrip,
    }),
    User_Task.create({
      role: "editor",
      UserId: yuri,
      TaskId: greatshakes,
    }),
    User_Task.create({
      role: "attendee",
      UserId: anahis,
      TaskId: greatshakes,
    }),
    User_Task.create({
      role: "editor",
      UserId: irais,
      TaskId: expediacar,
    }),
    User_Task.create({
      role: "attendee",
      UserId: anahis,
      TaskId: expediacar,
    }),
    User_Task.create({
      role: "editor",
      UserId: tim,
      TaskId: marriot,
    }),
    User_Task.create({
      role: "editor",
      UserId: kirk,
      TaskId: urthcafe,
    }),
    User_Task.create({
      role: "attendee",
      UserId: tim,
      TaskId: urthcafe,
    }),
    User_Task.create({
      role: "editor",
      UserId: irais,
      TaskId: teatime,
    }),
    User_Task.create({
      role: "attendee",
      UserId: anahis,
      TaskId: teatime,
    }),
    User_Task.create({
      role: "editor",
      UserId: irais,
      TaskId: nycsubway,
    }),
    User_Task.create({
      role: "editor",
      UserId: anahis,
      TaskId: nycsubway,
    }),
  ]);

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
