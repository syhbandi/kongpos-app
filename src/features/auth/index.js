import { authService } from "./authService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  status: null,
  message: null,
  token: JSON.parse(localStorage.getItem("token")) || null,
};

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    return await authService.login(data.no_hp, data.passwd);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state, action) => {
      state.user = null;
      state.status = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // track perjalanan dari request getPenjualan
    builder
      .addCase(login.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        // state.token = action.payload;
        state.status = "";
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
