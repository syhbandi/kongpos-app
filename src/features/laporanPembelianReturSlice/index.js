import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import laporanPembelianReturAPI from "./laporanPembelianReturAPI";

const initialState = {
  data: null,
  status: "",
  message: "",
  dataCount: null,
};

export const getPembelianRetur = createAsyncThunk(
  "laporanPembelianRetur/getPembelianRetur",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await laporanPembelianReturAPI.getPembelianRetur(data, token);
    } catch (error) {
      return thunkAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);
export const getPembelianReturCount = createAsyncThunk(
  "laporanPembelianRetur/getPembelianReturCount",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await laporanPembelianReturAPI.getPembelianRetur(data, token);
    } catch (error) {
      return thunkAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);

const laporanPembelianReturSlice = createSlice({
  name: "laporanPembelianRetur",
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
      .addCase(getPembelianRetur.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getPembelianRetur.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(getPembelianRetur.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "";
      });
    builder
      .addCase(getPembelianReturCount.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getPembelianReturCount.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(getPembelianReturCount.fulfilled, (state, action) => {
        state.dataCount = action.payload;
        state.status = "";
      });
  },
});

export const { reset } = laporanPembelianReturSlice.actions;
export default laporanPembelianReturSlice.reducer;
