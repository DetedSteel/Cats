import { FunctionComponent, useContext, useEffect, useState } from 'react';
// import { CatPropT } from "../../types/app";
import { useParams } from 'react-router-dom';
import { CatT } from '../../types/app';
import { LoginContext } from '../../Context/LoginContext';

export const Cat: FunctionComponent = () => {
  const params = useParams();
  const loginContext = useContext(LoginContext);

  const [cat, setCat] = useState<CatT>();

  useEffect(() => {
    fetch(`https://cats.petiteweb.dev/api/single/${loginContext.username}/show/${params.id}`, {
      method: 'get',
    }).then(function (response) {
      if (response.ok) {
        response.json().then(data => setCat(data));
      } else {
        throw new Error('Ошибка при выполнении запроса');
      }
    });
  }, [params.id]);

  return (
    <div>
      <h1>{cat?.name}</h1>
      <p>{cat?.age} года</p>
      <p>{cat?.description}</p>
      <p>{cat?.rate}/5</p>
      <img src={cat?.image} alt="" />
    </div>
  );
};
