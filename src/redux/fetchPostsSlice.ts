import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../axios';

type TPost = {
  _id: string;
  title: string;
  text: string;
  tags: [];
  viewsCount: number;
  user: {
    _id: string;
    fullName: string;
    email: string;
    passwordHash: string;
    avatarUrl: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
};

interface PostsState {
  posts: {
    items: TPost[];
    status: string;
  };
  tags: {
    items: string[];
    status: string;
  };
  post: {
    item: TPost | {};
    status: string;
  };
}

const initialState: PostsState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
  post: {
    item: {},
    status: 'loading',
  },
};

export const fetchAllPosts = createAsyncThunk<TPost[]>('posts/fetchAllPosts', async () => {
  const { data } = await axios.get<TPost[]>('/posts');
  return data;
});

export const fetchAllTags = createAsyncThunk<string[]>('posts/fetchTags', async () => {
  const { data } = await axios.get<string[]>('/tags');
  return data;
});

export const fetchOnePost = createAsyncThunk<TPost, string>('posts/fetchOnePost', async (id) => {
  const { data } = await axios.get<TPost>(`/posts/${id}`);
  return data;
});

export const fetchPostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //ALL POSTS
    builder.addCase(fetchAllPosts.pending, (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    });
    builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    });
    builder.addCase(fetchAllPosts.rejected, (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    });
    //ALL TAGS
    builder.addCase(fetchAllTags.pending, (state) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    });
    builder.addCase(fetchAllTags.fulfilled, (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    });
    builder.addCase(fetchAllTags.rejected, (state) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    });
    //ONE POST
    builder.addCase(fetchOnePost.pending, (state) => {
      state.post.item = {};
      state.post.status = 'loading';
    });
    builder.addCase(fetchOnePost.fulfilled, (state, action) => {
      state.post.item = action.payload;
      state.post.status = 'loaded';
    });
    builder.addCase(fetchOnePost.rejected, (state) => {
      state.post.item = {};
      state.post.status = 'loading';
    });
  },
});

export const {} = fetchPostsSlice.actions;

export default fetchPostsSlice.reducer;
