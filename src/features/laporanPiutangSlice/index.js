import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import laporanPiutangAPI from "./laporanPiutangAPI";

const initialState = {
  data: null,
  status: "",
  message: "",
  dataCount: 0,
};

export const getPiutang = createAsyncThunk(
  "laporanPiutang/getPiutang",
  async (data, thunAPI) => {
    try {
      return await laporanPiutangAPI.getPiutang(data);
    } catch (error) {
      return thunAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);
export const getPiutangCount = createAsyncThunk(
  "laporanPiutang/getPiutangCount",
  async (data, thunAPI) => {
    try {
      return await laporanPiutangAPI.getPiutang(data);
    } catch (error) {
      return thunAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);

const laporanPiutangSlice = createSlice({
  name: "laporanPiutang",
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
      .addCase(getPiutang.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getPiutang.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(getPiutang.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "";
      });
    builder
      .addCase(getPiutangCount.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getPiutangCount.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(getPiutangCount.fulfilled, (state, action) => {
        state.dataCount = action.payload.jumlah_record;
        state.status = "";
      });
  },
});

export const { reset } = laporanPiutangSlice.actions;
export default laporanPiutangSlice.reducer;
