import { FunctionComponent } from "react";
import { CatT } from "../../types/app";
import { Link } from "react-router-dom";

export const CatCard:FunctionComponent<CatT> = ({id, name}) => {
  return (
    <div>
      {name}
      <Link to={`cats/${id}`}>Больше про котика</Link>
    </div>
  )
}