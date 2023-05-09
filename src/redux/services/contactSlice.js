import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contacts :[],
    searchTerm:""
}

export const contactSlice = createSlice({
    name:"contactSlice",
    initialState,
    reducers:{
        ADD_CONTACT:(state,{payload}) => {
            state.contacts = payload
        },
        SEARCH_TERM:(state,{payload}) => {
            state.searchTerm = payload
        } 
    }
})

export const { ADD_CONTACT, SEARCH_TERM } = contactSlice.actions;
export default contactSlice.reducer