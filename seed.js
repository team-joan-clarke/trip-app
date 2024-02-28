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
    status: "active",
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
    start_date: new Date(2024, 7, 16),
    end_date: new Date(2024, 7, 20),
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
    start_date: new Date(2022, 11, 3),
    end_date: new Date(2022, 11, 3),
    status: "complete",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTO1y52-cuFMKc2cVCwlBsLPqfr-rC_MTPWg&usqp=CAU",
  },
  {
    name: "Cancun Trip",
    city: "Cancun",
    state: "Cancun",
    country: "Mexico",
    start_date: new Date(2024, 8, 5),
    end_date: new Date(2024, 8, 23),
    status: "active",
    imageUrl:
      "https://i.pinimg.com/736x/3c/7f/fa/3c7ffa6e84ec56fad2d48d9fa2f4f3e4.jpg",
  },
  {
    name: "Trip to Vancouver",
    city: "Vancouver",
    state: "Vancouver",
    country: "Canada",
    start_date: new Date(2024, 10, 5),
    end_date: new Date(2024, 10, 23),
    status: "active",
    imageUrl:
      "https://publish.purewow.net/wp-content/uploads/sites/2/2022/07/things-to-do-in-vancouver-cat.jpg",
  },
  // DEMO
  {
    name: "Jen's 30th Birthday",
    city: "Nashville",
    state: "Tennessee",
    country: "United States",
    start_date: new Date(2023, 2, 23),
    end_date: new Date(2023, 2, 26),
    status: "active",
    imageUrl:
      "https://publish.purewow.net/wp-content/uploads/sites/2/2022/07/things-to-do-in-vancouver-cat.jpg",
  },
  {
    name: "Bogota 2023!!",
    city: "Bogota",
    state: "D.C.",
    country: "Colombia",
    start_date: new Date(2023, 5, 5),
    end_date: new Date(2023, 5, 21),
    status: "active",
    imageUrl:
      "https://publish.purewow.net/wp-content/uploads/sites/2/2022/07/things-to-do-in-vancouver-cat.jpg",
  },
  {
    name: "Quiet Weekend Upstate",
    city: "Hudson",
    state: "New York",
    country: "United States",
    start_date: new Date(2023, 0, 12),
    end_date: new Date(2023, 0, 17),
    status: "active",
    imageUrl:
      "https://publish.purewow.net/wp-content/uploads/sites/2/2022/07/things-to-do-in-vancouver-cat.jpg",
  },
  {
    name: "F1 Miami 2023",
    city: "Miami",
    state: "Florida",
    country: "United States",
    start_date: new Date(2023, 4, 3),
    end_date: new Date(2023, 4, 9),
    status: "active",
    imageUrl:
      "https://publish.purewow.net/wp-content/uploads/sites/2/2022/07/things-to-do-in-vancouver-cat.jpg",
  },
  {
    name: "Aspen Food and Wine",
    city: "Aspen",
    state: "Colorado",
    country: "United States",
    start_date: new Date(2023, 5, 14),
    end_date: new Date(2023, 5, 18),
    status: "active",
    imageUrl:
      "https://publish.purewow.net/wp-content/uploads/sites/2/2022/07/things-to-do-in-vancouver-cat.jpg",
  },
  {
    name: "Pick Matt Up From College",
    city: "Buffalo",
    state: "New York",
    country: "United States",
    start_date: new Date(2023, 4, 12),
    end_date: new Date(2023, 4, 14),
    status: "active",
    imageUrl:
      "https://publish.purewow.net/wp-content/uploads/sites/2/2022/07/things-to-do-in-vancouver-cat.jpg",
  },
  {
    name: "NYC Staycation",
    city: "New York",
    state: "New York",
    country: "United States",
    start_date: new Date(2023, 3, 15),
    end_date: new Date(2023, 3, 16),
    status: "active",
    imageUrl:
      "https://publish.purewow.net/wp-content/uploads/sites/2/2022/07/things-to-do-in-vancouver-cat.jpg",
  },
  {
    name: "Paris",
    city: "Paris",
    state: "France",
    country: "Europe",
    start_date: new Date(2023, 6, 15),
    end_date: new Date(2023, 7, 18),
    status: "active",
    imageUrl:
      "https://media.cntraveler.com/photos/5cf96a9dd9fb41f17ed08435/3:2/w_1600%2Cc_limit/Eiffel%2520Tower_GettyImages-1005348968.jpg"
  },
  {
    name: "Maui",
    city: "Kihea",
    state: "Hawaii",
    country: "USA",
    start_date: new Date(2024, 3, 29),
    end_date: new Date(2024, 4, 4),
    status: "active",
    imageUrl:
      "https://images.unsplash.com/photo-1562191326-0da0767cfffe?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
      phoneNumber: "212-334-3333",
    }),

    // DEMO
    // *** demo users MUST include "Demo" in firstName in order to display DEMO MODE alert ***
    // ie. "Sara Demo"
    User.create({
      firstName: "Sara Demo",
      lastName: "Petrova",
      username: "sara2",
      password: "pwsara",
      email: "sara@trippntestdemo.com",
      phoneNumber: "212-111-2222",
    }),
    User.create({
      firstName: "Connor",
      lastName: "Petrova",
      username: "connor",
      password: "pwconnor",
      email: "connor@trippntestdemo.com",
      phoneNumber: "212-111-3333",
    }),
    User.create({
      firstName: "Jen",
      lastName: "Petrova",
      username: "jen",
      password: "pwjen",
      email: "jen@trippntestdemo.com",
      phoneNumber: "212-111-1414",
    }),
    User.create({
      firstName: "Bradley",
      lastName: "Jones",
      username: "bradley",
      password: "pwbradley",
      email: "bradley@trippntestdemo.com",
      phoneNumber: "212-111-4444",
    }),
    User.create({
      firstName: "Darian Demo",
      lastName: "Fink",
      username: "darian",
      password: "pwdarian",
      email: "darian@trippntestdemo.com",
      phoneNumber: "212-111-5555",
    }),
    User.create({
      firstName: "Gemma",
      lastName: "Smith",
      username: "gemma",
      password: "pwgemma",
      email: "gemma@trippntestdemo.com",
      phoneNumber: "212-111-6666",
    }),
    User.create({
      firstName: "Sue",
      lastName: "Smith",
      username: "sue2",
      password: "pwsue",
      email: "sue@trippntestdemo.com",
      phoneNumber: "212-111-7777",
    }),
    User.create({
      firstName: "Bella",
      lastName: "Fortuna",
      username: "bella",
      password: "pwbella",
      email: "bella@trippntestdemo.com",
      phoneNumber: "212-111-8888",
    }),
    User.create({
      firstName: "Ben Demo",
      lastName: "Bart",
      username: "ben",
      password: "pwben",
      email: "ben@trippntestdemo.com",
      phoneNumber: "212-111-9999",
    }),
    User.create({
      firstName: "Devon",
      lastName: "Granger",
      username: "devon",
      password: "pwdevon",
      email: "devon@trippntestdemo.com",
      phoneNumber: "212-111-1010",
    }),
    User.create({
      firstName: "Mariah",
      lastName: "Boden",
      username: "mariah",
      password: "pwmariah",
      email: "mariah@trippntestdemo.com",
      phoneNumber: "212-111-1212",
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
  const cancun = await getTRIDByName("Cancun Trip");
  const vancouver = await getTRIDByName("Trip to Vancouver");
  // DEMO
  const jensBday = await getTRIDByName("Jen's 30th Birthday");
  const bogota = await getTRIDByName("Bogota 2023!!");
  const upstate = await getTRIDByName("Quiet Weekend Upstate");
  const miami = await getTRIDByName("F1 Miami 2023");
  const aspen = await getTRIDByName("Aspen Food and Wine");
  const college = await getTRIDByName("Pick Matt Up From College");
  const staycation = await getTRIDByName("NYC Staycation");
  const paris = await getTRIDByName("Paris");
  const maui = await getTRIDByName("Maui");

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
      due_date: new Date(2023, 0, 30),
      start_date: new Date(2023, 1, 16, 0, 0, 0),
      description:
        "BEIGNETS! Look into Cafe du Monde. Maybe do at night instead?",
      status: "in progress",
      TripId: mardigras,
    },
    {
      type: "Lodging",
      subtype: "Hotel",
      provider_name: "Bourbon Orleans Hotel",
      due_date: new Date(2023, 0, 15),
      start_date: new Date(2023, 1, 15, 15, 0, 0),
      end_date: new Date(2023, 1, 22, 11, 0, 0),
      description:
        "BEIGNETS! Look into Cafe du Monde. Maybe do at night instead?",
      status: "in progress",
      TripId: mardigras,
    },
    {
      type: "Dining",
      subtype: "Lunch",
      provider_name: "Johnny's Poboys",
      due_date: new Date(2023, 0, 30),
      description: "Johnny's Poboys or similar--check on veggie options",
      status: "in progress",
      TripId: mardigras,
    },
    {
      type: "Dining",
      subtype: "Dinner",
      provider_name: "Brennan's",
      due_date: new Date(2023, 0, 15),
      start_date: new Date(2023, 1, 16, 15, 55),
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
      due_date: new Date(2023, 0, 10),
      description: "Check on when wigs will be avail for pickup",
      status: "in progress",
      TripId: mardigras,
    },
    {
      type: "Activity",
      subtype: "Tour",
      provider_name: "Cemetery Tour",
      due_date: new Date(2023, 0, 10),
      start_date: new Date(2023, 1, 16, 12, 15),
      start_location: "Outside Lafayette Cemetery No. 1",
      description: "Book walking tour of one of the cemeteries?",
      status: "complete",
      TripId: mardigras,
    },
    {
      type: "Transportation",
      subtype: "Flight",
      provider_name: "T.B.D.",
      due_date: new Date(2023, 0, 25),
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
      due_date: new Date(2023, 1, 10),
      start_date: new Date(2023, 1, 17, 20, 30),
      description: "mix of country and jazz",
      status: "complete",
      TripId: mardigras,
    },
    {
      type: "Lodging",
      subtype: "Hotel",
      provider_name: "AirBnB in Cancun",
      due_date: new Date(2023, 2, 3),
      description: "Look for airBnb",
      status: "in progress",
      TripId: cancun,
    },
    // DEMO
    {
      type: "Transportation",
      subtype: "Car",
      provider_name: "Drive down",
      due_date: new Date(2023, 2, 7),
      start_date: new Date(2023, 2, 23, 6, 30),
      description: "Pick up Jen in Dover",
      status: "complete",
      TripId: jensBday,
    },
    {
      type: "Dining",
      subtype: "Dinner",
      provider_name: "Casa Rosa",
      due_date: new Date(2023, 2, 10),
      start_date: new Date(2023, 2, 24, 20, 30),
      description:
        "dining with live music and drinks. make res for 4 in case Jerry is able to come.",
      status: "complete",
      TripId: jensBday,
    },
    {
      type: "Lodging",
      subtype: "Private Rental",
      provider_name: "AirBnB near casa rosa",
      due_date: new Date(2023, 1, 15),
      description: "Look for airBnb walkable to Casa Rosa",
      status: "in progress",
      TripId: jensBday,
    },
    {
      type: "Activity",
      subtype: "Tour",
      provider_name: "Grand Ole Opre Tour",
      due_date: new Date(2023, 1, 15),
      description: "NEED TIX IN ADVANCE",
      status: "in progress",
      TripId: jensBday,
    },
    {
      type: "Transportation",
      subtype: "Flight",
      provider_name: "American Airlines",
      due_date: new Date(2023, 4, 7),
      start_date: new Date(2023, 5, 5),
      description: "2 carry ons, AA1058",
      booking_num: "3948372A",
      status: "complete",
      TripId: bogota,
    },
    {
      type: "Transportation",
      subtype: "Flight",
      provider_name: "American Airlines",
      due_date: new Date(2023, 4, 7),
      description: "2 carry ons, AA1122, check on seat upgrade",
      booking_num: "5679455A",
      status: "in progress",
      TripId: bogota,
    },
    {
      type: "Lodging",
      subtype: "Hotel",
      provider_name: "hotel ibis bogota museo",
      due_date: new Date(2023, 3, 15),
      start_date: new Date(2023, 0, 5, 5, 0, 0),
      end_date: new Date(2023, 0, 5, 20, 0, 0),
      description: "mark's recc, otherwise maybe look for flat",
      status: "in progress",
      TripId: bogota,
    },
    {
      type: "Transportation",
      subtype: "Train",
      provider_name: "Amtrak",
      due_date: new Date(2022, 11, 30),
      description: "1 carry on?",
      status: "in progress",
      TripId: upstate,
    },
    {
      type: "Lodging",
      subtype: "Private Rental",
      provider_name: "AirBnB in nature",
      due_date: new Date(2022, 11, 30),
      start_date: new Date(2023, 0, 12, 15, 0, 0),
      end_date: new Date(2023, 0, 16, 11, 0, 0),
      description: "Norma + Jake's Mountain Cottage",
      booking_num: "7462736",
      status: "complete",
      TripId: upstate,
    },
    {
      type: "Dining",
      subtype: "Breakfast",
      provider_name: "Breadfolks",
      due_date: new Date(2023, 0, 12),
      start_date: new Date(2023, 0, 13, 9, 30, 0),
      description: "cafe breakfast, maybe get to go and walk around?",
      status: "complete",
      link: "https://www.instagram.com/breadfolksbakery/",
      TripId: upstate,
    },
    {
      type: "Activity",
      subtype: "Other",
      provider_name: "Bodhi Spa",
      due_date: new Date(2023, 12, 15),
      status: "in progress",
      TripId: upstate,
    },
    {
      type: "Dining",
      subtype: "Snack",
      provider_name: "Verdigris Hot Chocolate",
      due_date: new Date(2023, 0, 12),
      start_date: new Date(2023, 0, 14, 16, 0, 0),
      description:
        "gourmet hot chocolate and tea shop. open 10-6. will be open for holiday monday as well.",
      status: "complete",
      link: "https://www.verdigristea.com/pages/cafe",
      TripId: upstate,
    },
    {
      type: "Transportation",
      subtype: "Flight",
      provider_name: "AA JFK",
      due_date: new Date(2023, 2, 10),
      description: "use points",
      status: "in progress",
      TripId: miami,
    },
    {
      type: "Lodging",
      subtype: "Friends and Family",
      provider_name: "Stay with Gemma",
      due_date: new Date(2023, 3, 30),
      start_date: new Date(2023, 4, 3, 17, 0, 0),
      end_date: new Date(2023, 4, 5, 13, 0, 0),
      description: "Southern Dade area",
      status: "complete",
      TripId: miami,
    },
    {
      type: "Lodging",
      subtype: "Friends and Family",
      provider_name: "Stay with Aunt Jean",
      due_date: new Date(2023, 3, 30),
      start_date: new Date(2023, 4, 5, 17, 0, 0),
      end_date: new Date(2023, 4, 8, 13, 0, 0),
      description: "Fort Lauderdale",
      status: "complete",
      TripId: miami,
    },
    {
      type: "Dining",
      subtype: "Dinner",
      provider_name: "CVI.CHE 105",
      due_date: new Date(2023, 4, 4),
      status: "in progress",
      TripId: miami,
    },
    {
      type: "Activity",
      subtype: "Sports",
      provider_name: "Quals",
      due_date: new Date(2022, 12, 1),
      start_date: new Date(2023, 4, 6, 15, 0, 0),
      status: "complete",
      TripId: miami,
    },
    {
      type: "Activity",
      subtype: "Sports",
      provider_name: "Finals",
      due_date: new Date(2022, 12, 1),
      start_date: new Date(2023, 4, 7, 11, 0, 0),
      status: "complete",
      TripId: miami,
    },
    {
      type: "Activity",
      subtype: "Sports",
      provider_name: "Race Day!!",
      due_date: new Date(2022, 12, 1),
      start_date: new Date(2023, 4, 8, 9, 30, 0),
      status: "complete",
      TripId: miami,
    },
    {
      type: "Dining",
      subtype: "Dinner",
      provider_name: "Marion Miami",
      due_date: new Date(2023, 4, 16),
      due_date: new Date(2023, 4, 7, 20, 0, 0),
      description: "need res",
      status: "in progress",
      link: "https://www.marionmiami.com/",
      TripId: miami,
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

  // DEMO
  const sarap = await getUIDByEmail("sara@trippntestdemo.com");
  const connor = await getUIDByEmail("connor@trippntestdemo.com");
  const jen = await getUIDByEmail("jen@trippntestdemo.com");
  const bradley = await getUIDByEmail("bradley@trippntestdemo.com");
  const darian = await getUIDByEmail("darian@trippntestdemo.com");
  const gemma = await getUIDByEmail("gemma@trippntestdemo.com");
  const sue = await getUIDByEmail("sue@trippntestdemo.com");
  const bella = await getUIDByEmail("bella@trippntestdemo.com");
  const ben = await getUIDByEmail("ben@trippntestdemo.com");
  const devon = await getUIDByEmail("devon@trippntestdemo.com");
  const mariah = await getUIDByEmail("mariah@trippntestdemo.com");

  await Promise.all([
    User_Trip.create({
      role: "owner",
      UserId: anahis,
      TripId: maui,
    }),
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
      role: "owner",
      UserId: anahis,
      TripId: paris,
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
    User_Trip.create({
      role: "owner",
      UserId: anahis,
      TripId: cancun,
    }),
    User_Trip.create({
      role: "owner",
      UserId: anahis,
      TripId: vancouver,
    }),
    User_Trip.create({
      role: "attendee",
      UserId: yuri,
      TripId: cancun,
    }),
    User_Trip.create({
      role: "attendee",
      UserId: collin,
      TripId: cancun,
    }),
    User_Trip.create({
      role: "attendee",
      UserId: murphy,
      TripId: cancun,
    }),
    // DEMO
    User_Trip.create({
      role: "owner",
      UserId: sarap,
      TripId: jensBday,
    }),
    User_Trip.create({
      role: "editor",
      UserId: jen,
      TripId: jensBday,
    }),
    User_Trip.create({
      role: "editor",
      UserId: connor,
      TripId: jensBday,
    }),
    User_Trip.create({
      role: "attendee",
      UserId: bradley,
      TripId: jensBday,
    }),
    User_Trip.create({
      role: "owner",
      UserId: ben,
      TripId: bogota,
    }),
    User_Trip.create({
      role: "owner",
      UserId: ben,
      TripId: aspen,
    }),
    User_Trip.create({
      role: "editor",
      UserId: sue,
      TripId: aspen,
    }),
    User_Trip.create({
      role: "editor",
      UserId: jen,
      TripId: aspen,
    }),
    User_Trip.create({
      role: "editor",
      UserId: darian,
      TripId: upstate,
    }),
    User_Trip.create({
      role: "attendee",
      UserId: bella,
      TripId: upstate,
    }),
    User_Trip.create({
      role: "attendee",
      UserId: mariah,
      TripId: upstate,
    }),
    User_Trip.create({
      role: "owner",
      UserId: devon,
      TripId: upstate,
    }),
    User_Trip.create({
      role: "editor",
      UserId: gemma,
      TripId: upstate,
    }),
    User_Trip.create({
      role: "owner",
      UserId: ben,
      TripId: miami,
    }),
    User_Trip.create({
      role: "owner",
      UserId: gemma,
      TripId: miami,
    }),
    User_Trip.create({
      role: "editor",
      UserId: darian,
      TripId: miami,
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
  const bourbon = await getTAIDByName("Bourbon Orleans Hotel");
  const tbdFlight = await getTAIDByName("T.B.D.");
  const tipitinas = await getTAIDByName("Tipitina's");
  // KYLE'S BDAY
  const airBnB = await getTAIDByName("AirBnB");
  // PALM SPRINGS
  const palmspringsstrip = await getTAIDByName("Palm Spring Strip");
  const greatshakes = await getTAIDByName("Great Shakes");
  const expediacar = await getTAIDByName("Expedia Rental Car");
  // LAGUNA
  const marriot = await getTAIDByName("The Marriot");
  const urthcafe = await getTAIDByName("Urth Cafe");
  // TEA SHOP
  const teatime = await getTAIDByName("Tea shop in NYC");
  const nycsubway = await getTAIDByName("NYC Subway");
  //cancun
  const airBNBForCancun = await getTAIDByName("AirBnB in Cancun");

  // DEMO
  //JJEN'S 30TH BIRTHDAY
  const nashdrive = await getTAIDByName("Drive down");
  const casarosa = await getTAIDByName("Casa Rosa");
  const airBnBNash = await getTAIDByName("AirBnB near casa rosa");
  const opre = await getTAIDByName("Grand Ole Opre Tour");
  //F1 MIAMI 2023
  const miamiflight = await getTAIDByName("AA JFK");
  const staygemma = await getTAIDByName("Stay with Gemma");
  const stayaunt = await getTAIDByName("Stay with Aunt Jean");
  const marion = await getTAIDByName("Marion Miami");
  const raceday = await getTAIDByName("Race Day!!");
  const ceviche = await getTAIDByName("CVI.CHE 105");
  const quals = await getTAIDByName("Quals");
  const finals = await getTAIDByName("Finals");
  //QUIET WEEKEND UPSTATE
  const bodhi = await getTAIDByName("Bodhi Spa");
  const amtrak = await getTAIDByName("Amtrak");
  const natureAirbnb = await getTAIDByName("AirBnB in nature");
  const verdegris = await getTAIDByName("Verdigris Hot Chocolate");
  const breadfolks = await getTAIDByName("Breadfolks");

  await Promise.all([
    User_Task.create({
      role: "editor",
      UserId: ashley,
      TaskId: enterprise,
    }),
    User_Task.create({
      role: "attendee",
      UserId: murphy,
      TaskId: enterprise,
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
      UserId: neil,
      TaskId: bourbon,
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
      UserId: yuri,
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
    User_Task.create({
      role: "editor",
      UserId: anahis,
      TaskId: airBNBForCancun,
    }),
    // DEMO
    User_Task.create({
      role: "editor",
      UserId: sarap,
      TaskId: nashdrive,
    }),
    User_Task.create({
      role: "editor",
      UserId: sarap,
      TaskId: casarosa,
    }),
    User_Task.create({
      role: "editor",
      UserId: connor,
      TaskId: airBnBNash,
    }),
    User_Task.create({
      role: "editor",
      UserId: sarap,
      TaskId: airBnBNash,
    }),
    User_Task.create({
      role: "editor",
      UserId: jen,
      TaskId: opre,
    }),
    User_Task.create({
      role: "attendee",
      UserId: sarap,
      TaskId: opre,
    }),
    User_Task.create({
      role: "editor",
      UserId: ben,
      TaskId: miamiflight,
    }),
    User_Task.create({
      role: "editor",
      UserId: darian,
      TaskId: quals,
    }),
    User_Task.create({
      role: "editor",
      UserId: ben,
      TaskId: quals,
    }),
    User_Task.create({
      role: "editor",
      UserId: darian,
      TaskId: finals,
    }),
    User_Task.create({
      role: "editor",
      UserId: ben,
      TaskId: finals,
    }),
    User_Task.create({
      role: "editor",
      UserId: darian,
      TaskId: raceday,
    }),
    User_Task.create({
      role: "editor",
      UserId: ben,
      TaskId: raceday,
    }),
    User_Task.create({
      role: "editor",
      UserId: ben,
      TaskId: staygemma,
    }),
    User_Task.create({
      role: "editor",
      UserId: ben,
      TaskId: stayaunt,
    }),
    User_Task.create({
      role: "editor",
      UserId: gemma,
      TaskId: ceviche,
    }),
    User_Task.create({
      role: "attendee",
      UserId: ben,
      TaskId: ceviche,
    }),
    User_Task.create({
      role: "editor",
      UserId: ben,
      TaskId: marion,
    }),
    User_Task.create({
      role: "attendee",
      UserId: gemma,
      TaskId: marion,
    }),
    User_Task.create({
      role: "attendee",
      UserId: darian,
      TaskId: marion,
    }),
    User_Task.create({
      role: "editor",
      UserId: gemma,
      TaskId: bodhi,
    }),
    User_Task.create({
      role: "attendee",
      UserId: bella,
      TaskId: bodhi,
    }),
    User_Task.create({
      role: "attendee",
      UserId: devon,
      TaskId: bodhi,
    }),
    User_Task.create({
      role: "attendee",
      UserId: mariah,
      TaskId: bodhi,
    }),
    User_Task.create({
      role: "editor",
      UserId: darian,
      TaskId: amtrak,
    }),
    User_Task.create({
      role: "attendee",
      UserId: bella,
      TaskId: amtrak,
    }),
    User_Task.create({
      role: "attendee",
      UserId: mariah,
      TaskId: amtrak,
    }),

    User_Task.create({
      role: "editor",
      UserId: gemma,
      TaskId: breadfolks,
    }),
    User_Task.create({
      role: "attendee",
      UserId: bella,
      TaskId: breadfolks,
    }),
    User_Task.create({
      role: "attendee",
      UserId: darian,
      TaskId: breadfolks,
    }),
    User_Task.create({
      role: "attendee",
      UserId: mariah,
      TaskId: breadfolks,
    }),
    User_Task.create({
      role: "editor",
      UserId: devon,
      TaskId: natureAirbnb,
    }),
    User_Task.create({
      role: "editor",
      UserId: darian,
      TaskId: natureAirbnb,
    }),
    User_Task.create({
      role: "attendee",
      UserId: bella,
      TaskId: natureAirbnb,
    }),
    User_Task.create({
      role: "attendee",
      UserId: mariah,
      TaskId: natureAirbnb,
    }),
    User_Task.create({
      role: "attendee",
      UserId: gemma,
      TaskId: natureAirbnb,
    }),
    User_Task.create({
      role: "attendee",
      UserId: bella,
      TaskId: verdegris,
    }),
    User_Task.create({
      role: "attendee",
      UserId: mariah,
      TaskId: verdegris,
    }),
    User_Task.create({
      role: "editor",
      UserId: gemma,
      TaskId: verdegris,
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
