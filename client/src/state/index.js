import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth.js";
import storage from "redux-persist/lib/storage";

import { persistReducer, persistStore } from "redux-persist";
const persistConfig = { key: "root", storage, version: 1 };

const rootReducer = combineReducers({
  auth: authReducer,
});

const reducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
    devtools: (process.env.NODE_ENV === "development")
});

const persistor = persistStore(store);

export { store, persistor };
