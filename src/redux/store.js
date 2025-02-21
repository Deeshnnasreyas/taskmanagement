import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import userReducer from "./userSlice";
const persistConfig = {
  key: "root",
  storage,
  whiteList: ["user"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: userReducer,
  })
);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
