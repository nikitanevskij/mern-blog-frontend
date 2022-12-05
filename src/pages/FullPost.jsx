import React from 'react';
import { useParams } from 'react-router-dom';

import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import { useAppDispatch } from '../redux/store';
import { fetchOnePost } from '../redux/fetchPostsSlice';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';

export const FullPost = () => {
  const dispatch = useAppDispatch();
  const { post } = useSelector((state) => state.fetchPostsSlice);
  const isLoadedPost = post.status === 'loading';

  const params = useParams();

  React.useEffect(() => {
    dispatch(fetchOnePost(params.id));
  }, []);

  if (isLoadedPost) {
    return <Post isLoading={isLoadedPost} />;
  }
  return (
    <>
      <Post
        id={post.item._id}
        title={post.item.title}
        imageUrl={post.item.imageUrl}
        user={{
          avatarUrl:
            'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
          fullName: post.item.user.fullName,
        }}
        createdAt={post.item.createdAt}
        viewsCount={post.item.viewsCount}
        commentsCount={3}
        tags={post.item.tags}
        isFullPost
      >
        <ReactMarkdown children={post.item.text} />
      </Post>

      <CommentsBlock
        items={[
          {
            user: {
              fullName: 'Вася Пупкин',
              avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
            },
            text: 'Это тестовый комментарий 555555',
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
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
