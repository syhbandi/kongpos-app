import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { requestContract } from "./buatKontrakAPI";

const initialState = {
  data: null,
  status: "",
  message: "",
};
export const postRequestContract = createAsyncThunk(
  "requestContract/postRequest",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await requestContract.postRequestContract(data, token);
    } catch (error) {
      return thunkAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);

const postRequestContractSlice = createSlice({
  name: "requestContract",
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
      .addCase(postRequestContract.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(postRequestContract.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(postRequestContract.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "";
      });
  },
});

export const { reset } = postRequestContractSlice.actions;
export default postRequestContractSlice.reducer;
