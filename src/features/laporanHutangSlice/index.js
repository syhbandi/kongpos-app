import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import laporanHutangAPI from "./laporanHutangAPI";

const initialState = {
  data: null,
  status: "",
  message: "",
  dataCount: 0,
};

export const getHutang = createAsyncThunk(
  "laporanHutang/getHutang",
  async (data, thunAPI) => {
    try {
      const token = thunAPI.getState().auth.user.access_token;
      return await laporanHutangAPI.getHutang(data, token);
    } catch (error) {
      return thunAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);
export const getHutangCount = createAsyncThunk(
  "laporanHutang/getHutangCount",
  async (data, thunAPI) => {
    try {
      const token = thunAPI.getState().auth.user.access_token;
      return await laporanHutangAPI.getHutang(data, token);
    } catch (error) {
      return thunAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);

const laporanHutangSlice = createSlice({
  name: "laporanHutang",
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
      .addCase(getHutang.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getHutang.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(getHutang.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "";
      });
    builder
      .addCase(getHutangCount.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getHutangCount.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(getHutangCount.fulfilled, (state, action) => {
        state.dataCount = action.payload.jumlah_record;
        state.status = "";
      });
  },
});

export const { reset } = laporanHutangSlice.actions;
export default laporanHutangSlice.reducer;
