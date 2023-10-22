import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { CatT } from '../../types/app';
import { CatCard } from '../CatCard/CatCard';
import { CatsContext } from '../../Context/CatsContext';
import { EditCatForm } from '../EditCatForm/EditCatForm';

export const CatsList: FunctionComponent = () => {
  const [cats, setCat] = useState<CatT[]>();

  const catContext = useContext(CatsContext);

  useEffect(() => {
    console.log(1);
    fetch(`https://cats.petiteweb.dev/api/single/DS/show/`, { method: 'get' }).then(
      function (response) {
        if (response.ok) {
          response.json().then(data => setCat(data));
        } else {
          throw new Error('Ошибка при выполнении запроса');
        }
      },
    );
  }, [catContext.updated]);

  return (
    <div>
      {cats?.map(e => <CatCard key={e.id} card={e} />)}
      {catContext.catUpdate && <EditCatForm />}
    </div>
  );
};
