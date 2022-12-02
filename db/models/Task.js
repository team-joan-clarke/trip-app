const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Task = db.define("Task", {
  type: {
    type: DataTypes.ENUM(
      "Transportation",
      "Lodging",
      "Dining",
      "Activity",
      "Business"
    ),
    allowNull: false,
  },
  subtype: {
    type: {
      type: DataTypes.ENUM(
        "Flight",
        "Train",
        "Bus",
        "Car",
        "Bike",
        "Public Transportation",
        "Walk",
        "Hotel",
        "Private Rental",
        "Camping",
        "Couch Surfing",
        "Friends and Family",
        "Breakfast",
        "Brunch",
        "Lunch",
        "Dinner",
        "Snack",
        "Outdoors",
        "Entertainment",
        "Sports",
        "Arts",
        "Tours",
        "Other",
        "Meeting",
        "Presentation",
        "Round Table",
        "Keynote",
        "Lab",
        "Mixer",
        "Check In"
      ),
    },
  },
  provider_name: {
    type: DataTypes.STRING,
  },
  due_date: {
    type: DataTypes.DATE,
  },
  start_date: {
    type: DataTypes.DATE,
  },
  end_date: {
    type: DataTypes.DATE,
    validate: {
      startDateAfterEndDate() {
        if (this.start_date.isAfter(this.end_date)) {
          throw new Error("Start date must be before the end date.");
        }
      },
    },
  },
  start_time: {
    type: DataTypes.TIME,
  },
  end_time: {
    type: DataTypes.TIME,
  },
  start_location: {
    type: DataTypes.TEXT,
  },
  end_location: {
    type: DataTypes.TEXT,
  },
  description: {
    type: DataTypes.TEXT,
  },
  booking_num: {
    type: DataTypes.TEXT,
  },
  link: {
    type: DataTypes.TEXT,
    validate: {
      isUrl: true,
    },
  },
  status: {
    type: DataTypes.ENUM("in progress", "complete"),
  },
});

module.exports = Task;
