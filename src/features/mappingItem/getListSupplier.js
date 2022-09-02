import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { listSupplierContracted } from "./mappingItemAPI";

const initialState = {
  data: null,
  status: "",
  message: "",
};
export const getListSupplierA = createAsyncThunk(
  "getListSupplierContracted/contracted",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await listSupplierContracted.getListSupplierContracted(
        data,
        token
      );
    } catch (error) {
      return thunkAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);

const getListSupplierSlice = createSlice({
  name: "getListSupplierContracted",
  initialState,
  reducers: {
    reset: (state, action) => {
      state.data = null;
      state.status = "";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // track perjalanan dari request getPenjualan
    builder
      .addCase(getListSupplierA.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getListSupplierA.rejected, (state, action) => {
        state.status = "rejected";
        state.message = "data tidak ada";
      })
      .addCase(getListSupplierA.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "";
      });
  },
});

export const { reset } = getListSupplierSlice.actions;
export default getListSupplierSlice.reducer;
