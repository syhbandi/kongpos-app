import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postDataBarangSatuan } from "./itemSupplierAPI";

const initialState = {
  status: "",
  message: "",
};
export const postBarangSatuan = createAsyncThunk(
  "postBarangSatuan/postData",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await postDataBarangSatuan.postBarangSatuan(data, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.Pesan);
    }
  }
);

const postBarangSatuanSlice = createSlice({
  name: "postBarangSatuan",
  initialState,
  reducers: {
    reset: (state, action) => {
      state.status = "";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // track perjalanan dari request getPenjualan
    builder
      .addCase(postBarangSatuan.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(postBarangSatuan.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(postBarangSatuan.fulfilled, (state, action) => {
        state.message = action.payload;
        state.status = "fulfilled";
      });
  },
});

export const { reset } = postBarangSatuanSlice.actions;
export default postBarangSatuanSlice.reducer;
