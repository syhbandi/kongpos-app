import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import laporanPendapatanAPI from "./laporanPendapatanAPI";

const initialState = {
  data: null,
  status: "",
  message: "",
  dataCount: 0,
};

export const getPendapatan = createAsyncThunk(
  "laporanPendapatan/getPendapatan",
  async (data, thunAPI) => {
    try {
      const token = thunAPI.getState().auth.user.access_token;
      return await laporanPendapatanAPI.getPendapatan(data, token);
    } catch (error) {
      return thunAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);
export const getPendapatanCount = createAsyncThunk(
  "laporanPendapatan/getPendapatanCount",
  async (data, thunAPI) => {
    try {
      const token = thunAPI.getState().auth.user.access_token;
      return await laporanPendapatanAPI.getPendapatan(data, token);
    } catch (error) {
      return thunAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);

const laporanPendapatanSlice = createSlice({
  name: "laporanPendapatan",
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
      .addCase(getPendapatan.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getPendapatan.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(getPendapatan.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "";
      });
    builder
      .addCase(getPendapatanCount.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getPendapatanCount.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(getPendapatanCount.fulfilled, (state, action) => {
        state.dataCount = action.payload;
        state.status = "";
      });
  },
});

export const { reset } = laporanPendapatanSlice.actions;
export default laporanPendapatanSlice.reducer;
