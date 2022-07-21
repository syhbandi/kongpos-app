import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dataSupplier } from "./permintaanKontrakAPI";

const initialState = {
  dtSupplier: null,
  statusSup: "",
  messageSup: "",
};
export const getSupplierData = createAsyncThunk(
  "supplier/getSupplier",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await dataSupplier.getSupplierDt(data, token);
    } catch (error) {
      return thunkAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);

const getSupplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    reset: (state, action) => {
      state.dtSupplier = null;
      state.statusSup = "";
      state.messageSup = "";
    },
  },
  extraReducers: (builder) => {
    // track perjalanan dari request getPenjualan
    builder
      .addCase(getSupplierData.pending, (state, action) => {
        state.statusSup = "pending";
      })
      .addCase(getSupplierData.rejected, (state, action) => {
        state.statusSup = "rejected";
        state.messageSup = action.payload;
      })
      .addCase(getSupplierData.fulfilled, (state, action) => {
        state.dtSupplier = action.payload;
        state.statusSup = "";
      });
  },
});

export const { reset } = getSupplierSlice.actions;
export default getSupplierSlice.reducer;
