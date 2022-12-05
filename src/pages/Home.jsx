import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchAllPosts, fetchAllTags } from '../redux/fetchPostsSlice';

export const Home = () => {
  const dispatch = useAppDispatch();
  const { posts, tags } = useSelector((state) => state.fetchPostsSlice);
  const { data } = useSelector((state) => state.fetchAuthSlice);

  const isLoadingPosts = posts.status === 'loading';
  const isLoadingTags = tags.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchAllPosts());
    dispatch(fetchAllTags());
  }, []);
  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isLoadingPosts ? [...Array(5)] : posts.items).map((obj, index) =>
            isLoadingPosts ? (
              <Post key={index} isLoading={isLoadingPosts} />
            ) : (
              <Post
                key={index}
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isLoading={isLoadingPosts}
                isEditable={data?._id === obj.user._id}
              />
            ),
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isLoadingTags} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
