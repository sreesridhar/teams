import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { getPreloadedState, saveToLocalStorage } from "./../store/localStorage";
import appSlice from "./appSlice";

const combinedReducer = combineReducers({
  app: appSlice,
});

const rootReducer = (state, action) => {
  /**
   * to reset whole app state to initial state
   */
  if (action.type === "auth/setUser") {
    state = undefined;
  }

  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: getPreloadedState(),
});

function onStateChange() {
  saveToLocalStorage(store.getState());
}

store.subscribe(onStateChange);

export default store;
