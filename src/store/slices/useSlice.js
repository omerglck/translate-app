import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../actions/userAction";

const initialState = {
  users: [],
  isLoading: true,
  isError: false,
};

const useSlice = createSlice({
  name: "users",
  initialState,
  // thunk aksiyonlarını yönetmek için extraReducers kullanılır.
  extraReducers: {
    //* henüz api'dan cevap gelmediyse çalışır
    [getUser.pending]: (state) => {
      state.isLoading = true;
    },
    //* api'dan olumlu cevap gelirse çalışır
    [getUser.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
      state.isError = false;
    },
    //* api'den olumsuz cevap gelirse çalışır
    [getUser.rejected]: (state) => {
      state.isError = true;
    },
  },
});

export default useSlice.reducer;
