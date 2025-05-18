import { CDN_URL } from "../Utils/contants";

const ResturentCard = (props) => {
  const { resData } = props;
  const {
    cloudinaryImageId,
    name,
    cuisines,
    avgRating,
    sla: { deliveryTime },
  } = resData?.info; //optional chaining
  // console.log(resData);

  return (
    <div className="res-card">
      <img className="res-img" src={CDN_URL + cloudinaryImageId} />
      <div className="res-about">
        <h3 className="text-center truncate">{name}</h3>
        <h4 className="truncate">{cuisines.join(", ")}</h4>
        <div className="res-details flex">
          <div className="flex flex-center">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#facc15"
                viewBox="0 0 24 24"
              >
                <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.401 8.165L12 18.896l-7.335 3.866 1.401-8.165L.132 9.21l8.2-1.192z" />
              </svg>
            </div>
            <h4>{avgRating}</h4>
          </div>
          <h4>{`${deliveryTime} min`}</h4>
        </div>
      </div>
    </div>
  );
};

export const promotedRes = (ResturentCard) => {
  return () => {
    return (
      <div>
        <label>Promoted</label>
        <ResturentCard />
      </div>
    );
  };
};

export default ResturentCard;
