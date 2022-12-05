import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor'; //библиотека  редактора текста
import axios from '../../axios';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { isAuthSelect } from '../../redux/fetchAuthSlice';

export const AddPost = () => {
  const inputFileRef = React.useRef(null);
  const navigate = useNavigate();
  const [value, setValue] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const isAuth = useSelector(isAuthSelect);
  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData(); //создаем для загрузки картинки
      const file = e.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert('Ошибка при загрузке файла');
    }
  };
  const onClickRemoveImage = () => {};
  const onChange = React.useCallback((value) => {
    setValue(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
        uniqueId: 'mernproject',
      },
    }),
    [],
  );

  const onSubmit = async () => {
    try {
      setLoading(true);
      const newPost = {
        title: title,
        text: value,
        tags: tags.split(','),
        imageUrl: imageUrl,
      };

      const { data } = await axios.post('/posts', newPost);
      const id = data._id;
      console.log(data);
      navigate(`/posts/${id}`);
    } catch (err) {
      console.log(err);
      alert('Не удалось создать статью');
    }
  };
  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img className={styles.image} src={`http://localhost:3333${imageUrl}`} alt="Uploaded" />
        </>
      )}

      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        variant="standard"
        placeholder="Тэги"
        fullWidth
      />
      <SimpleMDE className={styles.editor} value={value} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button size="large" variant="contained" onClick={onSubmit}>
          Опубликовать
        </Button>
        <Button size="large">Отмена</Button>
      </div>
    </Paper>
  );
};
