import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "./slices/todoSlices";
const makeStore = () => {
  return configureStore({
    reducer: {
      todos: todoReducer,
    },
  });
};

export const store = makeStore();
// Infering the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infering the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
