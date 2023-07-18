import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardsContainer } from "../../components/CardsContainer/CardsContainer";
import { getCountries, getCountryByName } from "../../redux/actions";
import searchIcon from "../../images/searchIcon.png";

import style from "./Home.module.css";

export const Home = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch countries when the component mounts
    dispatch(getCountries());
  }, [dispatch]);

  const [searchedCountry, setSearchedCountry] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleInputChange = (event) => {
    // Update the search input value
    let search = event.target.value;
    setSearchedCountry(search);
  };

  const handleClick = () => {
    if (!searchedCountry.length)
      // Display an alert if the search input is empty
      return window.alert("Write the country name to search");

    // Dispatch the action to search for a country by name
    dispatch(getCountryByName(searchedCountry));
    setSearched(true);
  };

  let searchedResults = useSelector((state) => state.country);

  return (
    <div className={style.container}>
      <h1>Countries API</h1>

      <div className={style.searchBar}>
        {/* Search input field */}
        <input
          onChange={handleInputChange}
          placeholder="Search a country by name ..."
          type="search"
        />
        {/* Search button */}
        <button className={style.searchButton} onClick={handleClick}>
          <img src={searchIcon} alt="SearchIcon" />
        </button>
      </div>

      {/* Render the cards container */}
      <CardsContainer
        searchedCountry={searchedCountry}
        searchedResults={searchedResults}
        searched={searched}
      />
    </div>
  );
};
