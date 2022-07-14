import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerContract from "./buatKontrakAPI";

const initialState = {
  data: null,
  status: "",
  message: "",
  dataCount: null,
};
export const getCustomerContract = createAsyncThunk(
  "customer/getCustomerContract",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await customerContract.getCustomer(data, token);
    } catch (error) {
      return thunkAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);
export const getCustomerContractCount = createAsyncThunk(
  "customer/getCustomerContractCount",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await customerContract.getCustomer(data, token);
    } catch (error) {
      return thunkAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);

const customerContractSlice = createSlice({
  name: "customer",
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
      .addCase(getCustomerContract.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getCustomerContract.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(getCustomerContract.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "";
      });
    builder
      .addCase(getCustomerContractCount.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getCustomerContractCount.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      })
      .addCase(getCustomerContractCount.fulfilled, (state, action) => {
        state.dataCount = action.payload;
        state.status = "";
      });
  },
});

export const { reset } = customerContractSlice.actions;
export default customerContractSlice.reducer;
