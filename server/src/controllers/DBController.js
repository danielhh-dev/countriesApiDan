const axios = require("axios");
const { Country } = require("../db");

const loadApiDataToDB = async () => {
  try {
    const api = await axios.get("http://localhost:5000/countries");

    apiInformation = await Country.findAll();

    if (apiInformation.length) return apiInformation;

    const allCountriesInfo = await api.data.map((country) => {
      return {
        id: country.cca3,
        name: country.name.common,
        flag: country.flags[1],
        capital: country.capital ? country.capital[0] : "Not found",
        continet: country.region,
        subregion: country.subregion,
        area: country.area,
        population: country.population,
      };
    });

    apiInformation = Country.bulkCreate(allCountriesInfo);

    return apiInformation;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { loadApiDataToDB };
