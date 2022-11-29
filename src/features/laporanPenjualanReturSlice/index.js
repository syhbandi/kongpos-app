import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import laporanPenjualanReturAPI from "./laporanPenjualanReturAPI";

const initialState = {
  data: null,
  status: "",
  message: "",
  dataCount: null,
};

export const getPenjualanRetur = createAsyncThunk(
  "laporanPenjualanRetur/getPenjualanRetur",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await laporanPenjualanReturAPI.getPenjualanRetur(data, token);
    } catch (error) {
      return thunkAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);
export const getPenjualanReturCount = createAsyncThunk(
  "laporanPenjualanRetur/getPenjualanReturCount",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await laporanPenjualanReturAPI.getPenjualanRetur(data, token);
    } catch (error) {
      return thunkAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);

const laporanPenjualanReturSlice = createSlice({
  name: "laporanPenjualanRetur",
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
      .addCase(getPenjualanRetur.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getPenjualanRetur.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(getPenjualanRetur.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "";
      });
    builder
      .addCase(getPenjualanReturCount.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getPenjualanReturCount.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(getPenjualanReturCount.fulfilled, (state, action) => {
        state.dataCount = action.payload;
        state.status = "";
      });
  },
});

export const { reset } = laporanPenjualanReturSlice.actions;
export default laporanPenjualanReturSlice.reducer;
