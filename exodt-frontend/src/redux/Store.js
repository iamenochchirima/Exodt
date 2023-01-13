import {configureStore} from '@reduxjs/toolkit'
import rootReducer from './reducers';

const initialState = {};

const store = configureStore({
    reducer: rootReducer,
    initialState: initialState,
  })

export default store;