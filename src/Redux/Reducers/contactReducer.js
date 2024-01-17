
// for creating slice and async thunk
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")


// initial State containing the data
const initialState = {contactList:[],
                    showContact:null,
                    showAddContact:null};


// for fetching data from API on first render of the page
export const contactThunk = createAsyncThunk(
    'contact/fetchAPI',
    async() => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();

        // returning the data to extra Reducer for storing it inside the initial State
        return data;
    }
)


// making an API call for creating a new contact 
export const addContactThunk = createAsyncThunk(
    'contact/createContact',
    async(args,thunkAPI) => {
        fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify(
            args
        ),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json());
        // returning the new contact to extraReducer for storing it inside the initialState
        return args;
    }
)


// api call form deleting a contact from contact list
export const deleteContactThunk = createAsyncThunk(
    'contact/deleteContact',
    async(args,thunkAPI) => {
        fetch(`https://jsonplaceholder.typicode.com/`, {
            method: 'DELETE',
    });
    // return the contact to extra reducer to remove it from the initial state
    return args;
    }
)


// api call for update the data of a contact
export const updateContactThunk = createAsyncThunk(
    'contact/updateContact',
    async(args,thunkAPI) => {
        fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'PUT',
        body: JSON.stringify(
            args
        ),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json());
        // return the updated contact to extraReducer
        return args;
    }
)


// create a slice for contacts
const contactSlice = createSlice({
    name:'ContactList',
    initialState,
    // reducers
    reducers:{
        // to whether show or hide a contact on moreInfo page 
        setShowContact:(state,action) => {
            // if previously add contact page was opened 
            if(state.showAddContact){
                // remove the page from screen
                state.showAddContact = null;
            }

            // store the data of clicked contact inside the showContact variable
            state.showContact = action.payload;
        },
        // for showing form to add a new contact
        setShowAddContact:(state,action) => {
            // if more info page for a contact is opened already
            if(state.showContact){
                // remove it
                state.showContact = null;
            }
            // toggle the value of Add contact page
            state.showAddContact = !state.showAddContact;
        },
    },
    // extra reducers 
    extraReducers:(builder) => {
        // first case storing the values inside contact list array from Api
        builder.addCase(contactThunk.fulfilled,(state,action) => {
            // store inside the array
            state.contactList = [...action.payload];
        })
        // to add a contact inside the contact list array
        .addCase(addContactThunk.fulfilled,(state,action) => {
            // push the new contact inside the contact list array
            state.contactList.push(action.payload);
            state.showAddContact=null;
        })
        // to update a contact inside the array
        .addCase(updateContactThunk.fulfilled,(state,action) => {
            const data = action.payload;
            // make new array by filtering the values
            const newList = state.contactList.filter((contact) => contact.id !== data.id);
            // store new array inside the contact list
            state.contactList = newList;
            // append the updated values inside the array
            state.contactList.push(data);
            state.showContact=null;
        })
        // delete a contact inside the array
        .addCase(deleteContactThunk.fulfilled,(state,action) => {
            const data = action.payload;
            // make new array by filtering the old array
            const newList = state.contactList.filter((contact) => contact.id !== data.id);
            // store the new array inside the contact list
            state.contactList = newList;
            state.showContact=null;
        })
    }
})


// export the contact reducer for the store
export const contactReducer = contactSlice.reducer;

// export all the actions
export const { setShowContact, setShowAddContact } = contactSlice.actions;

// exporting the initial state
export const contactSelector = (state) => state.contactReducer;
