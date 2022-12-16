import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import laporanInventoriAPI from "./laporanInventoriAPI";

const initialState = {
  data: null,
  status: "",
  message: "",
  dataCount: 0,
};

export const getInventori = createAsyncThunk(
  "laporanInventori/getInventori",
  async (data, thunAPI) => {
    try {
      const token = thunAPI.getState().auth.user.access_token;
      return await laporanInventoriAPI.getInventori(data, token);
    } catch (error) {
      return thunAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);
export const getInventoriCount = createAsyncThunk(
  "laporanInventori/getInventoriCount",
  async (data, thunAPI) => {
    try {
      const token = thunAPI.getState().auth.user.access_token;
      return await laporanInventoriAPI.getInventori(data, token);
    } catch (error) {
      return thunAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);

const laporanInventoriSlice = createSlice({
  name: "laporanInventori",
  initialState,
  reducers: {
    reset: (state, action) => {
      state.data = null;
      state.dataCount = 0;
      state.status = "";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // track perjalanan dari request getPenjualan
    builder
      .addCase(getInventori.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getInventori.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(getInventori.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "";
      });
    builder
      .addCase(getInventoriCount.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getInventoriCount.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(getInventoriCount.fulfilled, (state, action) => {
        state.dataCount = action.payload;
        state.status = "";
      });
  },
});

export const { reset } = laporanInventoriSlice.actions;
export default laporanInventoriSlice.reducer;
