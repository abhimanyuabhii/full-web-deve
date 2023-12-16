import axios from 'axios';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

import productService, { rateProduct } from './productService';
import { getSingleProduct } from './productService'; 

export const getAllProducts = createAsyncThunk("product/get", async (thunkAPI) => {
  try {
    const response = await productService.getProducts();
    return response.products; // Assuming your API response has a property named 'products'
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});


export const getAProducts = createAsyncThunk("product/getAproduct", async (id, thunkAPI) => {
  try {
    const response = await getSingleProduct(id);  // Use the imported getSingleProduct function
    return response;  // Assuming your API response structure is fine
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});



export const addRating = createAsyncThunk("product/rating", async ( data, thunkAPI) => {
  try {
    return await rateProduct(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const productState = {
  products: [], // Change 'product' to 'products'
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState: productState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload; // Update to 'products'
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload; // Update to 'products'
        state.message = "Product Fetched Succesfully"
      })

      .addCase(getAProducts.rejected, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(addRating.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addRating.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.rating = action.payload; // Update to 'products'
        state.message = "Rating Added Succesfully"
        if(state.isSuccess){
          toast.success("Review Added Succesfully")
        }
      })

      .addCase(addRating.rejected, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
     
  },
});

export default productSlice.reducer;
export const base_url = "http://localhost:4000/api/v1/products";
