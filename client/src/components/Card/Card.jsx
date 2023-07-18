import { Link } from "react-router-dom";
import style from "./Card.module.css";

export const Card = (props) => {
  return (
    <div className={style.container}>
      <Link to={`/detail/${props.id}`}>
        <img src={props.flag} alt="Coutry Flag" />
      </Link>
      <h2>{props.name}</h2>
      <p>
        <span>continent:</span> {props.continent.toUpperCase()}
      </p>
    </div>
  );
};
