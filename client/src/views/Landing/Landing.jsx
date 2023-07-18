import { Link } from "react-router-dom";
import style from "./Landing.module.css";
import travelKit from "../../images/travelKit.png";

export const Landing = () => {
  return (
    <div className={style.containerLanding}>
      <img src={travelKit} alt="travel kit" />

      <div className={style.infoLanding}>
        <h1>Explore,</h1>
        <h1>Discover</h1>
        <p>
          Find your passion in every country and create unforgettable memories.
        </p>

        <Link to="/home">
          <button>Let's do it !</button>
        </Link>
      </div>
    </div>
  );
};
