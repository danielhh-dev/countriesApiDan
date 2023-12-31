const { searchCountryByName } = require("../controllers/countriesControllers");

const { Country, Activity } = require("../db");

const getAllCountries = async (req, res) => {
  const { name } = req.query;

  try {
    const result = name
      ? await searchCountryByName(name)
      : await Country.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getCountryById = async (req, res) => {
  try {
    const { id } = req.params;
    const countryid = await Country.findByPk(id.toUpperCase(), {
      include: {
        model: Activity,
        through: {
          attributes: [],
        },
      },
    });

    !countryid &&
      res
        .status(400)
        .json(`No existe un pais con el ID: -${id.toUpperCase()}-`);

    return res.status(200).json(countryid);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllCountries,
  getCountryById,
};
