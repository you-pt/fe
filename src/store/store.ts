import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // 로컬 스토리지 사용
import sessionReducer from "./slices/sessionSlice";

const rootReducer = combineReducers({
  session: sessionReducer,
  // 다른 필요한 리듀서 추가 가능
});

const persistConfig = {
  key: "root",
  storage, // 로컬 스토리지 사용
  whitelist: ["session"], // 영구 저장할 리듀서 지정
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
