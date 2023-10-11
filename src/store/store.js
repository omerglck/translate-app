import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import useSlice from "./slices/useSlice";
import translateSlice from "./slices/translateSlice";

export default configureStore({
  reducer: { useSlice, translateSlice },
});
