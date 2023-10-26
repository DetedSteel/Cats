import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { CatT } from '../../types/app';
import { CatCard } from '../CatCard/CatCard';
import { CatsContext } from '../../Context/CatsContext';
import { EditCatForm } from '../EditCatForm/EditCatForm';
import { LoginContext } from '../../Context/LoginContext';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import styles from './catslist.module.css';

export const CatsList: FunctionComponent = () => {
  const [cats, setCat] = useState<CatT[]>();
  const navigate = useNavigate();

  const catContext = useContext(CatsContext);
  const loginContext = useContext(LoginContext);

  console.log(loginContext.username);

  useEffect(() => {
    fetch(`https://cats.petiteweb.dev/api/single/${loginContext.username}/show/`, {
      method: 'get',
    }).then(function (response) {
      if (response.ok) {
        response.json().then(data => setCat(data));
      } else {
        throw new Error('Ошибка при выполнении запроса');
      }
    });
  }, [catContext.updated]);

  return (
    <div className={styles.container}>
      {Boolean(cats?.length) ? (
        <div className={styles.grid}>{cats?.map(e => <CatCard key={e.id} card={e} />)}</div>
      ) : (
        <h1 className={styles.addFirst}>Добавьте своего первого котика!</h1>
      )}
      {catContext.catUpdate && <EditCatForm />}
      <Button className={styles.btn} onClick={() => navigate('/add')} variant="contained">
        Добавить нового котика!
      </Button>
      <Outlet />
    </div>
  );
};
