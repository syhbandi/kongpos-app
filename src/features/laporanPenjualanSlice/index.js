import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import laporanPenjualanAPI from "./laporanPenjualanAPI";

const initialState = {
  data: null,
  status: "",
  message: "",
  dataCount: null,
};

export const getPenjualan = createAsyncThunk(
  "laporanPenjualan/getPenjualan",
  async (data, thunAPI) => {
    try {
      const token = thunAPI.getState().auth.user.access_token;
      return await laporanPenjualanAPI.getPenjualan(data, token);
    } catch (error) {
      return thunAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);
export const getPenjualanCount = createAsyncThunk(
  "laporanPenjualan/getPenjualanCount",
  async (data, thunAPI) => {
    try {
      const token = thunAPI.getState().auth.user.access_token;
      return await laporanPenjualanAPI.getPenjualan(data, token);
    } catch (error) {
      return thunAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);

const laporanPenjualanSlice = createSlice({
  name: "laporanPenjualan",
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
      .addCase(getPenjualan.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getPenjualan.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(getPenjualan.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "";
      });
    builder
      .addCase(getPenjualanCount.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getPenjualanCount.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(getPenjualanCount.fulfilled, (state, action) => {
        state.dataCount = action.payload;
        state.status = "";
      });
  },
});

export const { reset } = laporanPenjualanSlice.actions;
export default laporanPenjualanSlice.reducer;
