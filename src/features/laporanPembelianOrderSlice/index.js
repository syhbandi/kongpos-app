import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import laporanPembelianOrderAPI from "./laporanPembelianOrderAPI";

const initialState = {
  data: null,
  status: "",
  message: "",
  dataCount: null,
};

export const getPembelianOrder = createAsyncThunk(
  "laporanPembelianOrder/getPembelianOrder",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await laporanPembelianOrderAPI.getPembelianOrder(data, token);
    } catch (error) {
      return thunkAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);
export const getPembelianOrderCount = createAsyncThunk(
  "laporanPembelianOrder/getPembelianOrderCount",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await laporanPembelianOrderAPI.getPembelianOrder(data, token);
    } catch (error) {
      return thunkAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);

const laporanPembelianOrderSlice = createSlice({
  name: "laporanPembelianOrder",
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
    // track perjalanan dari request getPembelian
    builder
      .addCase(getPembelianOrder.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getPembelianOrder.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(getPembelianOrder.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "";
      });
    builder
      .addCase(getPembelianOrderCount.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getPembelianOrderCount.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(getPembelianOrderCount.fulfilled, (state, action) => {
        state.dataCount = action.payload;
        state.status = "";
      });
  },
});

export const { reset } = laporanPembelianOrderSlice.actions;
export default laporanPembelianOrderSlice.reducer;
