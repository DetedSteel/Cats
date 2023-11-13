import { FC, useContext, useEffect, useState } from 'react';
import { CatsContext } from '../../Context/CatsContext';
import { LoginContext } from '../../Context/LoginContext';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Register } from '../Register/Register';
import { LoginForm } from '../LoginForm/LoginForm';
import { Button } from '@mui/material';

export const Login: FC = () => {
  const [username, setUsername] = useState(localStorage.getItem('username') ?? '');
  const [register, setRegister] = useState(true);

  const catContext = useContext(CatsContext);

  useEffect(() => {
    if (username.length > 0) {
      catContext.setLogined(true);
    }
  }, []);

  return (
    <LoginContext.Provider value={{ username: username, setUsername: setUsername }}>
      {catContext.logined && <Header />}
      {!catContext.logined && (
        <div
          className="absolute left-[calc(100vw/2-250px)] top-[calc(100vh/2-250px)] flex h-[500px] w-[500px] flex-col items-center justify-center gap-10 rounded-[40px] border-4 border-blue shadow-lg shadow-blue max-lg:shadow-red"
          tabIndex={1}
        >
          <Button onClick={() => setRegister(!register)}>
            {register ? 'Войти' : 'Зарегистророваться'}
          </Button>
          {register ? <Register /> : <LoginForm />}
        </div>
      )}
      {catContext.logined && <Outlet />}
    </LoginContext.Provider>
  );
};
