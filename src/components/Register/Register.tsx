import { Button, TextField } from '@mui/material';
import ky from 'ky';
import { FC, useState, KeyboardEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CatsContext } from '../../Context/CatsContext';
import { LoginContext } from '../../Context/LoginContext';

export const Register: FC = () => {
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const catContext = useContext(CatsContext);
  const loginContext = useContext(LoginContext);

  type errorT = { error: string };
  type noError = { login: string; registered: boolean; token: string };

  function handleRegister(): void {
    (async () => {
      const a: errorT | noError = await ky
        .post('http://127.0.0.1:4000/signup', {
          json: { login: username, password: password },
        })
        .json();
      if ('login' in a) {
        loginContext.setUsername(a.login);
        catContext.setLogined(true);
        localStorage.setItem('username', loginContext.username);
        navigate('/cats');
      } else if (a.error === 'user already registered') {
        setError('Имя пользователя занято!');
      }
      console.log(a);
    })();
  }

  return (
    <div className="flex w-3/4 flex-col gap-[10px]">
      <h1 className="text-center font-roboto text-3xl font-semibold text-blue">
        Зарегистрироваться
      </h1>
      <TextField
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.code === 'Enter') {
            handleRegister();
          }
        }}
        label="Имя пользователя"
        value={username}
        helperText={error.length > 0 ? error : ''}
        error={Boolean(error)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setUsername(e.target.value);
        }}
      />
      <TextField
        label="Пароль"
        type="password"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
        }}
      />
      <Button variant="contained" onClick={() => handleRegister()}>
        Зарегистророваться
      </Button>
    </div>
  );
};
