const axios = require("axios");
const { Country } = require("../db");
const URL = "http://localhost:5000/countries";

async function loadApiDataToDB() {
  try {
    const { data } = await axios.get(URL);

    const countries = await data.map((country) => {
      return {
        id: country.cca3,
        name: country.name.common,
        flag: country.flags.png,
        continent: country.region,
        capital: country.capital ? country.capital[0] : "Not found",
        subregion: country.subregion,
        area: country.area,
        population: country.population,
      };
    });

    await Country.bulkCreate(countries);
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = loadApiDataToDB;
