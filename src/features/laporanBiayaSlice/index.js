import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import laporanBiayaAPI from "./laporanBiayaAPI";

const initialState = {
  data: null,
  status: "",
  message: "",
  dataCount: 0,
};

export const getBiaya = createAsyncThunk(
  "laporanBiaya/getBiaya",
  async (data, thunAPI) => {
    try {
      return await laporanBiayaAPI.getBiaya(data);
    } catch (error) {
      return thunAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);
export const getBiayaCount = createAsyncThunk(
  "laporanBiaya/getBiayaCount",
  async (data, thunAPI) => {
    try {
      return await laporanBiayaAPI.getBiaya(data);
    } catch (error) {
      return thunAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);

const laporanBiayaSlice = createSlice({
  name: "laporanBiaya",
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
      .addCase(getBiaya.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getBiaya.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(getBiaya.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "";
      });
    builder
      .addCase(getBiayaCount.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getBiayaCount.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(getBiayaCount.fulfilled, (state, action) => {
        state.dataCount = action.payload.jumlah_record;
        state.status = "";
      });
  },
});

export const { reset } = laporanBiayaSlice.actions;
export default laporanBiayaSlice.reducer;
