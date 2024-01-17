
// for creating store
import { configureStore } from "@reduxjs/toolkit";

// importing the contact Reducers
import { contactReducer } from "../Reducers/contactReducer";

// creating store from reducers
export const store = configureStore({
    reducer:{
        contactReducer
    }
})