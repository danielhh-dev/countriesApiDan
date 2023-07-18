import { useState } from "react";
import { useSelector } from "react-redux";
import {
  getCountriesAlphabetically,
  getCountriesbycontinent,
  getCountriesbyPopulation,
} from "../../helpers/filters";

import { Card } from "../Card/Card";

import style from "./CardsCointainer.module.css";

export const CardsContainer = ({
  searchedCountry,
  searchedResults,
  searched,
}) => {
  const countriesDB = useSelector((state) => state.countries);

  const [filter, setFilter] = useState({
    continent: "All",
    orderBy: "alphabetically",
    order: "ASC",
    filterbyActivity: "",
  });

  //PAGINATION

  const [currentIndex, setCurrentIndex] = useState(0);
  const [page, setPage] = useState(1);

  // Determine the data to be sorted and paginated
  let dataToOrder =
    searchedResults.length >= 1
      ? searchedResults
      : getCountriesbycontinent(countriesDB, filter.continent).slice(
          currentIndex,
          currentIndex + 10
        );

  // Handler for going to the next page
  const nextHandler = () => {
    setCurrentIndex(currentIndex + 10);
    setPage(page + 1);
  };

  // Handler for going to the previous page
  const prevHandler = () => {
    currentIndex > 0 && setCurrentIndex(currentIndex - 10);
    currentIndex > 2 && setPage(page - 1);
  };

  // Create the list of page numbers
  const numberOfPages = [];
  let dataSize =
    filter.continent === "All"
      ? countriesDB.length
      : getCountriesbycontinent(countriesDB, filter.continent).length;
  if (searchedResults.length >= 1) {
    dataSize = searchedResults.length;
  }
  for (let i = 1; i < Math.ceil(dataSize / 10); i++) {
    numberOfPages.push(i);
  }

  // Handler for selecting a page
  const pageSelectionHandler = (number) => {
    setPage(number);
    setCurrentIndex(number * 10);
  };

  // Change the order of countries alphabetically
  let allCountriesDataAZ = getCountriesAlphabetically(
    countriesDB.slice(0, countriesDB.length),
    filter.order
  );

  // Change the order of countries by population
  let allCountriesDataPop = getCountriesbyPopulation(
    countriesDB.slice(0, countriesDB.length),
    filter.order
  );

  // Get the countries ordered alphabetically based on the filter
  let alphabetically =
    filter.continent === "All"
      ? allCountriesDataAZ.slice(currentIndex, currentIndex + 10)
      : getCountriesAlphabetically(
          dataToOrder.slice(0, dataToOrder.length),
          filter.order
        );

  // Get the countries ordered by population based on the filter
  let byPopulation =
    filter.continent === "All"
      ? allCountriesDataPop.slice(currentIndex, currentIndex + 10)
      : getCountriesbyPopulation(
          dataToOrder.slice(0, dataToOrder.length),
          filter.order
        );

  // Handler for filter changes
  const changeHandler = (event) => {
    setCurrentIndex(0);
    setPage(1);
    const property = event.target.name;
    const value = event.target.value;
    setFilter({
      ...filter,
      [property]: value,
    });
  };

  return (
    <div className={style.container}>
      {/* Render the filter bar */}
      {!searched ? (
        <div className={style.filterBar}>
          <form>
            {/* Filter by Continent */}

            <select name="continent" onChange={changeHandler}>
              <option value="All">All continents</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Antarctic">Antarctic</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>

            {/* Order by */}
            <label htmlFor="orderBy">Order by </label>
            <select name="orderBy" onChange={changeHandler}>
              <option value="alphabetically">Alphabetically</option>
              <option value="population">Population</option>
            </select>

            {/* Ascending order */}
            <input
              onChange={changeHandler}
              type="radio"
              id="ASC"
              name="order"
              value="ASC"
              defaultChecked
            />
            <label htmlFor="ASC">⬆️</label>

            {/* Descending order */}
            <input
              onChange={changeHandler}
              type="radio"
              id="DES"
              name="order"
              value="DES"
            />
            <label htmlFor="DES">⬇️</label>

            {/* Filter by Activity */}
            <button onClick={changeHandler} name="filterbyActivity">
              Act - de 4hrs
            </button>
          </form>

          {/* Pagination */}
          <div className={style.pagination}>
            {/* Button for going to previous page */}
            <button
              onClick={prevHandler}
              disabled={page === 1 ? true : false}
              className={style.arrowsPagination}
            >
              ←
            </button>
            {/* Render page numbers */}
            {numberOfPages.map((number) => (
              <button
                className={
                  page === number ? style.pageNumberActive : style.pageNumber
                }
                key={number}
                onClick={() => pageSelectionHandler(number)}
              >
                {number}
              </button>
            ))}
            {/* Button for going to next page */}
            <button
              disabled={
                page === numberOfPages.length || !numberOfPages.length
                  ? true
                  : false
              }
              onClick={nextHandler}
              className={style.arrowsPagination}
            >
              {" "}
              →
            </button>
          </div>
        </div>
      ) : (
        <div>
          {/* Display message if no results found */}
          {searched && searchedResults.length === 0 && (
            <h2 className={style.notFoundMsg}>
              Country <span>"{searchedCountry.toUpperCase()}"</span> not found
            </h2>
          )}
          {/* Button to go back */}
          <button
            onClick={() => window.location.reload(false)}
            className={style.returnButton}
          >
            Return
          </button>
        </div>
      )}

      {/* Container for country cards */}
      <div
        className={
          searched && searchedResults.length === 0
            ? style.noDisplay
            : style.containerCards
        }
      >
        {/* Render country cards */}
        {dataToOrder === searchedResults
          ? dataToOrder.map((country) => {
              return (
                <Card
                  key={country.id}
                  id={country.id}
                  name={country.name}
                  flag={country.flag}
                  continent={country.continent}
                />
              );
            })
          : filter.orderBy === "alphabetically"
          ? alphabetically.map((country) => {
              return (
                <Card
                  key={country.id}
                  id={country.id}
                  name={country.name}
                  flag={country.flag}
                  continent={country.continent}
                />
              );
            })
          : byPopulation.map((country) => {
              return (
                <Card
                  key={country.id}
                  id={country.id}
                  name={country.name}
                  flag={country.flag}
                  continent={country.continent}
                />
              );
            })}
      </div>
    </div>
  );
};
