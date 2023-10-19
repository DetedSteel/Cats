import { FC } from 'react';
import { CardT } from '../../types/app';
import { Link } from 'react-router-dom';

export const CatCard: FC<CardT> = ({ card }) => {
  const { name, id } = card;

  return (
    <div>
      {name}
      <Link to={`cats/${id}`}>Больше про котика</Link>
    </div>
  );
};
