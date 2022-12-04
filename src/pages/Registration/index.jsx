import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useForm } from 'react-hook-form';

import styles from './Login.module.scss';
import { useAppDispatch } from '../../redux/store';
import { fetchAuth, fetchRegister, isAuthSelect } from '../../redux/fetchAuthSlice';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Registration = () => {
  const dispatch = useAppDispatch();

  const isAuth = useSelector(isAuthSelect);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: 'Nikita',
      email: 'nikite@list.ru',
      password: '12345',
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (obj) => {
    const registerUserData = await dispatch(fetchRegister(obj));

    if (!registerUserData.payload.token) {
      return alert('Не удалось зарегистрироваться!');
    }
    if ('token' in registerUserData.payload) {
      window.localStorage.setItem('token', registerUserData.payload.token);
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
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="FullName"
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          fullWidth
          {...register('fullName', { required: 'Укажите полное имя' })}
        />
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
