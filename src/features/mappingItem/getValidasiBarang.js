import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBarangValidasi } from "./mappingItemAPI";

const initialState = {
  data: null,
  status: "",
  message: "",
};
export const getListBarang = createAsyncThunk(
  "listBarang/validasi",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await getBarangValidasi(data, token);
    } catch (error) {
      return thunkAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);

const getListBarangSlice = createSlice({
  name: "listBarang",
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
      .addCase(getListBarang.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getListBarang.rejected, (state, action) => {
        state.status = "rejected";
        state.message = "data tidak ada";
      })
      .addCase(getListBarang.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "";
      });
  },
});

export const { reset } = getListBarangSlice.actions;
export default getListBarangSlice.reducer;
