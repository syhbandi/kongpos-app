import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import laporanPenjualanOrderAPI from "./laporanPenjualanOrderAPI";

const initialState = {
  data: null,
  status: "",
  message: "",
  dataCount: null,
};

export const getPenjualanOrder = createAsyncThunk(
  "laporanPenjualanOrder/getPenjualanOrder",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await laporanPenjualanOrderAPI.getPenjualanOrder(data, token);
    } catch (error) {
      return thunkAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);
export const getPenjualanOrderCount = createAsyncThunk(
  "laporanPenjualanOrder/getPenjualanOrderCount",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await laporanPenjualanOrderAPI.getPenjualanOrder(data, token);
    } catch (error) {
      return thunkAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);

const laporanPenjualanOrderSlice = createSlice({
  name: "laporanPenjualanOrder",
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
      .addCase(getPenjualanOrder.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getPenjualanOrder.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(getPenjualanOrder.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "";
      });
    builder
      .addCase(getPenjualanOrderCount.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getPenjualanOrderCount.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(getPenjualanOrderCount.fulfilled, (state, action) => {
        state.dataCount = action.payload;
        state.status = "";
      });
  },
});

export const { reset } = laporanPenjualanOrderSlice.actions;
export default laporanPenjualanOrderSlice.reducer;
