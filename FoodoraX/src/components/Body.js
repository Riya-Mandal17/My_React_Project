import ResturentCard, { promotedRes } from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";

import useOnlineStatus from "../Utils/useOnlineStatus";
import { MENU_API } from "../Utils/contants";

const Body = () => {
  // hookes : Local State variables - normal js variable
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  console.log(listOfRestaurants);
  const ResturentCardPromoted = promotedRes(ResturentCard);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.5743545&lng=88.3628734&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    // console.log(json);
    setListOfRestaurants(json?.data?.cards[1].card.card.gridElements.infoWithStyle.restaurants);
  };

  useEffect(() => {
    // if (!resval) return <Shimmer />;
    setListOfRestaurants(listOfRestaurants);
  }, []);

  const { searchText } = useOutletContext();

  useEffect(() => {
    const filterRestaurants = listOfRestaurants.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );

    if (filterRestaurants.length === 0 && searchText !== "") {
      alert("Item is not found!");
      return;
    }

    setListOfRestaurants(filterRestaurants);
  }, [searchText]);

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) return <h1>You are now offline !!!</h1>;

  if (!listOfRestaurants || listOfRestaurants.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="body">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            //filter logic
            const filteredList = listOfRestaurants.filter(
              (res) => res.info.avgRating >= 4.5
            );
            setListOfRestaurants(filteredList);
          }}
        >
          Top Rated Rastaurants
        </button>
      </div>
      <div className="res-container">
        {listOfRestaurants.map((restaurants) => (
          <Link
            key={restaurants.info.id}
            to={"/restaurant/" + restaurants.info.id}
            className="link-style"
          >
            {/* if(restaurants.info.pr) */
            restaurants.info.promoted ? <ResturentCardPromoted  resData={restaurants}/> :
            <ResturentCard resData={restaurants} />}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
