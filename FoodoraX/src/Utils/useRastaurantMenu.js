import { useState, useEffect } from "react";
import { MENU_API } from "./contants";

const useRastaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(MENU_API + resId);
    const json = await data.json();
    
    setResInfo(json.data);
  };

  return resInfo;
};

export default useRastaurantMenu;
