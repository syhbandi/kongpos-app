import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getItemContracted } from "./mappingItemAPI";

const initialState = {
  data: null,
  status: "",
  message: "",
  dataCount: null,
};
export const getListItemContracted = createAsyncThunk(
  "listItemContracted/contracted",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await getItemContracted(data, token);
    } catch (error) {
      return thunkAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);
export const getListItemContractedCount = createAsyncThunk(
  "listItemContracted/contractedCount",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await getItemContracted(data, token);
    } catch (error) {
      return thunkAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);

const getListItemContractedSlice = createSlice({
  name: "listItemContracted",
  initialState,
  reducers: {
    reset: (state, action) => {
      state.data = null;
      state.status = "";
      state.message = "";
      state.dataCount = "";
    },
  },
  extraReducers: (builder) => {
    // track perjalanan dari request getPenjualan
    builder
      .addCase(getListItemContracted.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getListItemContracted.rejected, (state, action) => {
        state.status = "rejected";
        state.message = "data tidak ada";
      })
      .addCase(getListItemContracted.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "";
      });
    builder
      .addCase(getListItemContractedCount.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getListItemContractedCount.rejected, (state, action) => {
        state.status = "rejected";
        state.message = "kosong";
      })
      .addCase(getListItemContractedCount.fulfilled, (state, action) => {
        state.dataCount = action.payload;
        state.status = "";
      });
  },
});

export const { reset } = getListItemContractedSlice.actions;
export default getListItemContractedSlice.reducer;
