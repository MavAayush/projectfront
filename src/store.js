import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "./components/redux/reducers/main";
import { composeWithDevTools } from '@redux-devtools/extension'; // Correct package, not "redux-devtools-extension"

const store = configureStore({
  reducer: rootReducer,
  // devTools: process.env.NODE_ENV !== 'production', // Enables DevTools in dev mode
  devTools: true, 
  
});

export default store;


/*
import {createStore,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {compositeWithDevTools} from "redux-devtools-extension";
import rootreducers from "./components/redux/reducers/main";

const middleware = [thunk];

const store = createStore(
    rootreducers,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

*/