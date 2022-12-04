import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import styles from './Login.module.scss';
import { useAppDispatch } from '../../redux/store';
import { fetchAuth, isAuthSelect } from '../../redux/fetchAuthSlice';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const Login = () => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(isAuthSelect);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: 'pavel@list.ru',
      password: '12345',
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (data) => {
    const responce = await dispatch(fetchAuth(data));
    //console.log(responce);
    if (!responce.payload) {
      return alert('Не удалось авторизоваться!');
    }
    if ('token' in responce.payload) {
      window.localStorage.setItem('token', responce.payload.token);
    } else {
      alert('Не удалось авторизоваться!');
    }
  };
  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          fullWidth
          type="email"
          {...register('email', { required: 'Укажите почту' })}
        />
        <TextField
          className={styles.field}
          label="Пароль"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          fullWidth
          {...register('password', { required: 'Введите верный пароль' })}
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
