import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from '../axios';

interface AuthUserState {
  data: {} | null;
  status: string;
}

const initialState: AuthUserState = {
  data: null,
  status: 'loading',
};

export const fetchAuth = createAsyncThunk<any, Record<string, string>>(
  'auth/fetchAuth',
  async (obj, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/auth/login', obj);
      return data;
    } catch (err) {
      //@ts-ignore
      return rejectWithValue(err.response.data);
    }
  },
);

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  const { data } = await axios.get('/auth/me');
  return data;
});

export const fetchRegister = createAsyncThunk('auth/register', async (obj, { rejectWithValue }) => {
  try {
    //@ts-ignore
    const { data } = await axios.post('/auth/register', obj);
    return data;
  } catch (err) {
    //@ts-ignore
    return rejectWithValue(err.response.data);
  }
});

export const fetchAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.status = 'loading';
    },
  },
  extraReducers: (builder) => {
    //AUTH USER
    builder.addCase(fetchAuth.pending, (state) => {
      state.data = null;
      state.status = 'loading';
    });
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    });
    builder.addCase(fetchAuth.rejected, (state, action) => {
      state.data = null;
      state.status = 'loading';
      //console.log(action.payload);
    });
    //GET USER ME
    builder.addCase(fetchAuthMe.pending, (state) => {
      state.data = null;
      state.status = 'loading';
    });
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    });
    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.data = null;
      state.status = 'loading';
    });
    //REGISTER
    builder.addCase(fetchRegister.pending, (state) => {
      state.data = null;
      state.status = 'loading';
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
      console.log('Успешная регистрация');
    });
    builder.addCase(fetchRegister.rejected, (state, action) => {
      state.data = null;
      state.status = 'loading';
    });
  },
});

//@ts-ignore
export const isAuthSelect = (state) => Boolean(state.fetchAuthSlice.data);
export const { logout } = fetchAuthSlice.actions;

export default fetchAuthSlice.reducer;
