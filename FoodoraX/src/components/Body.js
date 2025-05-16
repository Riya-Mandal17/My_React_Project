import ResturentCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import useFetchRastaurants from "../Utils/useFetchRastaurants";
import useOnlineStatus from "../Utils/useOnlineStatus";

const Body = () => {

  // hookes : Local State variables - normal js variable
  const [listOfRestaurants,setListOfRestaurants ] = useState([]);
  let resval = useFetchRastaurants();
  console.log(resval);

  useEffect(()=>{
    if(!resval) return <Shimmer />;
    setListOfRestaurants(resval);
  },[resval]);
  
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
  if(onlineStatus === false) return (<h1>You are now offline !!!</h1>);

  if (!listOfRestaurants|| listOfRestaurants.length === 0) {
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
          to = {"/restaurant/" +restaurants.info.id} className="link-style"><ResturentCard resData={restaurants} /></Link>
        ))}
      </div>
    </div>
  );
};

export default Body;

