import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import { isAuthSelect, logout } from '../../redux/fetchAuthSlice';

export const Header = () => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(isAuthSelect);

  const logoutUser = () => {
    if (window.confirm('Вы действительно хотите выйти из аккаунта?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };
  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>MERN BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/post/create">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button onClick={logoutUser} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
