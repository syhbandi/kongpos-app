import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { responseContract } from "./responseContractAPI";

const initialState = {
  data: null,
  status: "",
  message: "",
  dataCount: null,
};
export const getSupplierResponse = createAsyncThunk(
  "response/getSupplierResponse",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await responseContract.getResponseContract(data, token);
    } catch (error) {
      return thunkAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);
export const getSupplierResponseCount = createAsyncThunk(
  "response/getSupplierResponseCount",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await responseContract.getResponseContract(data, token);
    } catch (error) {
      return thunkAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);

const responseContractSlice = createSlice({
  name: "response",
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
      .addCase(getSupplierResponse.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getSupplierResponse.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(getSupplierResponse.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "";
      });
    builder
      .addCase(getSupplierResponseCount.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getSupplierResponseCount.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(getSupplierResponseCount.fulfilled, (state, action) => {
        state.dataCount = action.payload;
        state.status = "";
      });
  },
});

export const { reset } = responseContractSlice.actions;
export default responseContractSlice.reducer;
