import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postPaymentDt } from "../buatKontrak/buatKontrakAPI";

const initialState = {
  data: null,
  status: "",
  message: "",
};
export const postPayment = createAsyncThunk(
  "postPaymentData/postPayment",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await postPaymentDt(data, token);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.Pesan);
    }
  }
);

const postPaymentSlice = createSlice({
  name: "postPaymentData",
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
      .addCase(postPayment.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(postPayment.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(postPayment.fulfilled, (state, action) => {
        state.message = action.payload;
        state.status = "fulfilled";
      });
  },
});

export const { reset } = postPaymentSlice.actions;
export default postPaymentSlice.reducer;
