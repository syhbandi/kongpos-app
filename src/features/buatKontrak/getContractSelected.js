import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSelectedContracted } from "./buatKontrakAPI";

const initialState = {
  dataSelected: null,
  statusSelected: "",
  messageSelected: "",
};
export const postSelected = createAsyncThunk(
  "postSelected/selectedContract",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await getSelectedContracted(data, token);
    } catch (error) {
      return thunkAPI.rejectWithValue("Ada galat saat mengambil data");
    }
  }
);

const postSelectedContractSlice = createSlice({
  name: "postSelected",
  initialState,
  reducers: {
    reset: (state, action) => {
      state.dataSelected = null;
      state.statusSelected = "";
      state.messageSelected = "";
    },
  },
  extraReducers: (builder) => {
    // track perjalanan dari request getPenjualan
    builder
      .addCase(postSelected.pending, (state, action) => {
        state.statusSelected = "pending";
      })
      .addCase(postSelected.rejected, (state, action) => {
        state.statusSelected = "rejected";
        state.messageSelected = action.payload;
      })
      .addCase(postSelected.fulfilled, (state, action) => {
        state.dataSelected = action.payload;
        state.statusSelected = "";
      });
  },
});

export const { reset } = postSelectedContractSlice.actions;
export default postSelectedContractSlice.reducer;
