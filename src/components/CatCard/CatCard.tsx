import { FC, useContext } from 'react';
import { CardT } from '../../types/app';
import { Link } from 'react-router-dom';
import { CatsContext } from '../../Context/CatsContext';

export const CatCard: FC<CardT> = ({ card }) => {
  const { name, id } = card;

  const catContext = useContext(CatsContext);

  function setContext(): void {
    catContext.setId(id);
    catContext.catUpdateFn(!catContext.catUpdate);
  }

  return (
    <div>
      {name}
      <Link to={`cats/${id}`}>Больше про котика</Link>
      <button onClick={() => setContext()}>Редактировать котика</button>
    </div>
  );
};
