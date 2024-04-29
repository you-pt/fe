import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // 로컬 스토리지 사용
// import storage from "redux-persist/lib/storage/session"; // session storage
import loginReducer from "./slices/loginSlice";

export interface StateType {
  login: {
    isLogin: boolean
  }
}

export const rootReducer = combineReducers({
  login: loginReducer,
  // 다른 필요한 리듀서 추가 가능
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["login"], // 영구 저장할 리듀서 지정 (rootReducer의 key를 작성하도록)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
