const { Router } = require("express");
const {
  postActivities,
  getAllActivities,
} = require("../handlers/activitiesHandlers");

const activitiesRouter = Router();

const validate = (req, res, next) => {
  const { name } = req.body;
  !name &&
    res
      .status(400)
      .json({ error: "Missing data, write a name for the activity" });
  next();
};

activitiesRouter.post("/", validate, postActivities);
activitiesRouter.get("/", getAllActivities);

module.exports = activitiesRouter;
