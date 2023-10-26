import { FC, RefObject, useContext, useEffect, useRef, useState } from 'react';
import styles from './login.module.css';
import { Button, TextField } from '@mui/material';
import { CatsContext } from '../../Context/CatsContext';
import { LoginContext } from '../../Context/LoginContext';
import { Outlet, useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const usernameRef = useRef() as RefObject<HTMLInputElement> | null;
  const navigate = useNavigate();

  const [username, setUsername] = useState(localStorage.getItem('username') ?? '');

  const catContext = useContext(CatsContext);
  const loginContext = useContext(LoginContext);

  function handleLogin(): void {
    loginContext.username = username;
    catContext.setLogined(true);
    navigate('/cats');
    localStorage.setItem('username', username);
  }

  useEffect(() => {
    if (username) {
      loginContext.username = username;
      catContext.setLogined(true);
    }
  }, []);

  return (
    <LoginContext.Provider value={{ username: username, setUsername: setUsername }}>
      {!catContext.logined && (
        <div className={styles.container}>
          <TextField
            value={username}
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
