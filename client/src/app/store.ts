import {ThunkAction, Action } from '@reduxjs/toolkit';
import {applyMiddleware, createStore} from "redux";
import reducers from "../reducers";
import reduxThunk from "redux-thunk";

export const store = createStore(reducers, {}, applyMiddleware(reduxThunk))

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
