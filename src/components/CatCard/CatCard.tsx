import { FC, useContext } from 'react';
import { CardT } from '../../types/app';
import { Link } from 'react-router-dom';
import { CatsContext } from '../../Context/CatsContext';
import { LoginContext } from '../../Context/LoginContext';

export const CatCard: FC<CardT> = ({ card }) => {
  const { name, id } = card;

  const catContext = useContext(CatsContext);
  const loginContext = useContext(LoginContext);

  function setContext(): void {
    catContext.setId(id);
    catContext.catUpdateFn(!catContext.catUpdate);
  }

  function deleteCat(): void {
    fetch(`https://cats.petiteweb.dev/api/single/${loginContext.username}/delete/${id}`, {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response => {
      catContext.setUpdated(!catContext.updated);
      console.log(response.status);
    });
  }

  return (
    <div>
      {name}
      <Link to={`${id}`}>Больше про котика</Link>
      <button onClick={() => setContext()}>Редактировать котика</button>
      <button onClick={() => deleteCat()}>Удалить котика</button>
    </div>
  );
};
