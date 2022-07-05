import authService from "./authService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  status: null,
  message: null,
};

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    return await authService.login(data.noHp, data.password);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.error) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  authService.logout();
});

export const getUsahas = createAsyncThunk(
  "auth/getUsahas",
  async (data, thunkAPI) => {
    const noHp = thunkAPI.getState().auth.user.no_hp;
    try {
      return await authService.getUsahas(noHp);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
      state.status = null;
      state.message = null;
    },
    setUsaha: (state, action) => {
      state.user = { ...state.user, usaha: action.payload };
      localStorage.setItem(
        "user",
        JSON.stringify({ ...state.user, usaha: action.payload })
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "pending";
        state.message = "";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "fulfilled";
        state.message = "";
      });

    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
    });

    builder
      .addCase(getUsahas.pending, (state) => {
        state.status = "pending";
        state.message = "";
      })
      .addCase(getUsahas.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(getUsahas.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.message = "";
      });
  },
});

export const { reset, setUsaha } = authSlice.actions;
export default authSlice.reducer;
