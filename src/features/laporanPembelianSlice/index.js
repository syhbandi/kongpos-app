import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import laporanPembelianAPI from "./laporanPembelianAPI";

const initialState = {
  data: null,
  status: "",
  message: "",
  dataCount: 0,
};

export const getPembelian = createAsyncThunk(
  "laporanPembelian/getPembelian",
  async (data, thunAPI) => {
    try {
      const token = thunAPI.getState().auth.user.access_token;
      return await laporanPembelianAPI.getPembelian(data, token);
    } catch (error) {
      return thunAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);
export const getPembelianCount = createAsyncThunk(
  "laporanPembelian/getPembelianCount",
  async (data, thunAPI) => {
    try {
      const token = thunAPI.getState().auth.user.access_token;
      return await laporanPembelianAPI.getPembelian(data, token);
    } catch (error) {
      return thunAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);

const laporanPembelianSlice = createSlice({
  name: "laporanPembelian",
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
      .addCase(getPembelian.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getPembelian.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(getPembelian.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "";
      });
    builder
      .addCase(getPembelianCount.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getPembelianCount.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(getPembelianCount.fulfilled, (state, action) => {
        state.dataCount = action.payload.jumlah_record;
        state.status = "";
      });
  },
});

export const { reset } = laporanPembelianSlice.actions;
export default laporanPembelianSlice.reducer;
