import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { compareSupplier } from "./permintaanKontrakAPI";

const initialState = {
  data: null,
  status: "",
  message: "",
  dataCount: null,
};
export const getSupplierCompare = createAsyncThunk(
  "supplier/getSupplierCompare",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await compareSupplier.getSupplier(data, token);
    } catch (error) {
      return thunkAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);
export const getSupplierCompareCount = createAsyncThunk(
  "supplier/getSupplierCompareCount",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await compareSupplier.getSupplier(data, token);
    } catch (error) {
      return thunkAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);

const supplierCompareSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    reset: (state, action) => {
      state.data = null;
      state.status = "";
      state.message = "";
      state.dataCount = 0;
    },
  },
  extraReducers: (builder) => {
    // track perjalanan dari request getPenjualan
    builder
      .addCase(getSupplierCompare.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getSupplierCompare.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(getSupplierCompare.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "";
      });
    builder
      .addCase(getSupplierCompareCount.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getSupplierCompareCount.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(getSupplierCompareCount.fulfilled, (state, action) => {
        state.dataCount = action.payload;
        state.status = "";
      });
  },
});

export const { reset } = supplierCompareSlice.actions;
export default supplierCompareSlice.reducer;
