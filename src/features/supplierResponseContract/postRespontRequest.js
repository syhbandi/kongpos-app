import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postResponse } from "./responseContractAPI";

const initialState = {
  data: null,
  status: "",
  message: "",
};
export const postResponsRequest = createAsyncThunk(
  "responseRequest/postResponRequest",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await postResponse.postResponseContract(data, token);
    } catch (error) {
      return thunkAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);

const postResponseContractSlice = createSlice({
  name: "responseRequest",
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
      .addCase(postResponsRequest.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(postResponsRequest.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(postResponsRequest.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "";
      });
  },
});

export const { reset } = postResponseContractSlice.actions;
export default postResponseContractSlice.reducer;
