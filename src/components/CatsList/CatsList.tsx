import { FunctionComponent, useEffect, useState } from 'react';
import { CatT } from '../../types/app';
import { CatCard } from '../CatCard/CatCard';

export const CatsList: FunctionComponent = () => {
  const [cats, setCat] = useState<CatT[]>();

  useEffect(() => {
    fetch(`https://cats.petiteweb.dev/api/single/DS/show/`, { method: 'get' }).then(
      function (response) {
        if (response.ok) {
          response.json().then(data => setCat(data));
        } else {
          throw new Error('Ошибка при выполнении запроса');
        }
      },
    );
  }, []);

  return (
    <div>
      {cats?.map(e => (
        <CatCard
          key={e.id}
          id={e.id}
          name={e.name}
          image={e.image}
          age={e.age}
          rate={e.rate}
          favorite={e.favorite}
          description={e.description}
        />
      ))}
    </div>
  );
};
