import { Button, TextField } from '@mui/material';
import { FC, KeyboardEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CatsContext } from '../../Context/CatsContext';
import { LoginContext } from '../../Context/LoginContext';
import ky from 'ky';

export const LoginForm: FC = () => {
  const navigate = useNavigate();

  const [userError, setUserError] = useState('');
  const [pasError, setPasError] = useState('');

  const catContext = useContext(CatsContext);
  const loginContext = useContext(LoginContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin(): void {
    (async () => {
      const d: { token: string; login: string; message?: string } = await ky
        .post('http://127.0.0.1:4000/login', {
          json: {
            login: username,
            password: password,
          },
        })
        .json();
      if (d.token) {
        const n: { mesasage: string } = await ky
          .get('http://127.0.0.1:4000/validateToken', {
            headers: {
              authorization: `Bearer ${d.token}`,
            },
          })
          .json();
        console.log(n.mesasage);
        if (n.mesasage === 'token is VALID') {
          loginContext.setUsername(d.login);
          catContext.setLogined(true);
          localStorage.setItem('username', loginContext.username);
          navigate('/cats');
        }
        console.log(n);
      } else {
        setPasError('Неверный пароль!');
      }
      console.log(d);
    })();
  }

  useEffect(() => {
    if (username.length >= 1) {
      setUserError('');
    } else {
      setUserError('Имя пользователя не может быть пустым!');
    }
  }, [username]);

  return (
    <div className="flex w-3/4 flex-col gap-[10px]">
      <h1 className="text-center font-roboto text-3xl font-semibold text-blue">
        Введите имя пользователя и пароль
      </h1>
      <TextField
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.code === 'Enter') {
            handleLogin();
          }
        }}
        value={username}
        helperText={userError.length > 0 ? userError : ''}
        error={Boolean(userError)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setUsername(e.target.value);
        }}
      />
      <TextField
        type="password"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
        }}
        error={Boolean(pasError)}
        helperText={pasError.length > 0 ? pasError : ''}
      />
      <Button variant="contained" onClick={() => handleLogin()}>
        Войти
      </Button>
    </div>
  );
};
