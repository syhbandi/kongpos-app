import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postCompareSupplierDt } from "./permintaanKontrakAPI";

const initialState = {
  data: null,
  status: "",
  message: "",
};
export const postCompare = createAsyncThunk(
  "compareSupplierDt/postCompare",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await postCompareSupplierDt.postCompareSupplier(data, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.Pesan);
    }
  }
);

const postCompareSlice = createSlice({
  name: "compareSupplierDt",
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
      .addCase(postCompare.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(postCompare.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(postCompare.fulfilled, (state, action) => {
        state.message = action.payload;
        state.status = "fulfilled";
      });
  },
});

export const { reset } = postCompareSlice.actions;
export default postCompareSlice.reducer;
