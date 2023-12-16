import axios from 'axios';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';


import ContactService from './ContactService';

export const createQuery = createAsyncThunk("contact/post", async (contactData, thunkAPI) => {
  console.log(contactData);
  try {
    const response = await ContactService.postQuery(contactData);
    return response; // Return the entire response object
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});


const contactState = {
 contact: [], // Change 'product' to 'products'
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const contactSlice = createSlice({
  name: "contact",
  initialState: contactState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createQuery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createQuery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.contact = action.payload; // Access action.payload directly
        if (state.isSuccess === true) {
          toast.success("Contact Form Submitted Successfully");
        }
      })
      
      .addCase(createQuery.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
        if(state.isError === true){
            toast.success("Something Went Wrong")
        }
      });
  },
  
});

export default contactSlice.reducer;
export const base_url = "http://localhost:4000/api/v1/enquiry";
