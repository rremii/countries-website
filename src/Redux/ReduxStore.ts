import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk"
import MainReducer from "./MainSlice";
import {configureStore} from '@reduxjs/toolkit'
import {useDispatch} from "react-redux";

const store = configureStore({
    reducer: {
        MainReducer: MainReducer,
    },
})
// @ts-ignore
window.store = store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export default store
