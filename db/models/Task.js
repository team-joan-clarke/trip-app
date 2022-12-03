const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Task = db.define(
  "Task",
  {
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
        "Tour",
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
      // validate: {
      //   isUrl: true,
      // },
    },
    status: {
      type: DataTypes.ENUM("in progress", "complete"),
    },
  },
  {
    validate: {
      startDateAfterEndDate() {
        if (this.end_date) {
          if (this.start_date > this.end_date) {
            throw new Error("Start date must be before the end date.");
          }
        }
      },
    },
  }
);

Task.beforeSave((task) => {
  if (task.link && task.link !== "") {
    const urlRegex = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    const linkBool = urlRegex.test(task.link);
    if (!linkBool) {
      throw new Error("Link must be url");
    }
  }
});

module.exports = Task;

// User.beforeCreate(user => {
//   if (user.accessLevel > 10 && user.username !== "Boss") {
//     throw new Error("You can't grant this user an access level above 10!");
//   }
// });
