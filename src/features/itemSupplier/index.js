import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSupplierItem } from "./itemSupplierAPI";

const initialState = {
  data: null,
  status: "",
  message: "",
  dataCount: null,
};
export const getListSupplier = createAsyncThunk(
  "itemSupplier/getListSupplier",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await getSupplierItem(data, token);
    } catch (error) {
      return thunkAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);
export const getListSupplierCount = createAsyncThunk(
  "itemSupplier/getListSupplierCount",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await getSupplierItem(data, token);
    } catch (error) {
      return thunkAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);

const listSupplierSlice = createSlice({
  name: "itemSupplier",
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
      .addCase(getListSupplier.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getListSupplier.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(getListSupplier.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "";
      });
    builder
      .addCase(getListSupplierCount.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getListSupplierCount.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(getListSupplierCount.fulfilled, (state, action) => {
        state.dataCount = action.payload;
        state.status = "";
      });
  },
});

export const { reset } = listSupplierSlice.actions;
export default listSupplierSlice.reducer;
