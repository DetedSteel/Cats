import { FC, RefObject, useContext, useEffect, useRef, useState } from 'react';
import styles from './login.module.css';
import { Button, TextField } from '@mui/material';
import { CatsContext } from '../../Context/CatsContext';
import { LoginContext } from '../../Context/LoginContext';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from '../Header/Header';

export const Login: FC = () => {
  const usernameRef = useRef() as RefObject<HTMLInputElement> | null;
  const navigate = useNavigate();

  const [username, setUsername] = useState(localStorage.getItem('username') ?? '');
  const [error, setError] = useState('');

  const catContext = useContext(CatsContext);
  const loginContext = useContext(LoginContext);

  function handleLogin(): void {
    if (username.length >= 1) {
      loginContext.username = username;
      catContext.setLogined(true);
      navigate('/cats');
      localStorage.setItem('username', username);
      setError('');
    } else {
      setError('Имя пользователя не может быть пустым!');
    }
  }

  useEffect(() => {
    if (username.length >= 1) {
      setError('');
    } else {
      setError('Имя пользователя не может быть пустым!');
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      loginContext.username = username;
      catContext.setLogined(true);
    }
  }, []);

  return (
    <LoginContext.Provider value={{ username: username, setUsername: setUsername }}>
      {catContext.logined && <Header />}
      {!catContext.logined && (
        <div className={styles.container}>
          <h1 className={styles.header}>Введите имя пользователя</h1>
          <TextField
            value={username}
            helperText={error.length > 0 ? error : ''}
            error={Boolean(error)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUsername(e.target.value);
            }}
            ref={usernameRef}
          />
          <Button variant="contained" onClick={() => handleLogin()}>
            Войти
          </Button>
        </div>
      )}
      {catContext.logined && <Outlet />}
    </LoginContext.Provider>
  );
};
