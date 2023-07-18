const { createActivity } = require("../controllers/activitiesController.js");
const { Activity } = require("../db");

const postActivities = async (req, res) => {
  const { name, level, duration, season, countryid } = req.body;

  try {
    const newActivity = await createActivity(
      name,
      level,
      duration,
      season,
      countryid
    );
    res.status(201).json("Activity added");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllActivities = async (req, res) => {
  try {
    const result = await Activity.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { postActivities, getAllActivities };
