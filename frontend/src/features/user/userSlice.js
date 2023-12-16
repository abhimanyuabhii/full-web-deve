
import axios from 'axios';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { getCartService, authService,removeProductFromCartService,updateProductFromCartService, createOrder, getUserOrders, updateUser, emptyCart,  } from "./userService";
import { cartService } from './userService';

export const registerUser = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
  try {
    return await authService.register(userData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message); // Include only the error message
  }
});

export const loginUser = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
  try {
    return await authService.login(userData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message); // Include only the error message
  }

  


});



export const logoutUser = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    // Perform any additional logout logic if needed
    localStorage.clear(); // Clear localStorage
    console.log('Logout action dispatched');

    return null;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});




export const AddProdTOCart = createAsyncThunk("user/cart/add", async (cartData, thunkAPI) => {
  try {
    console.log('AddProdTOCart Action Dispatched:', cartData);

    return await cartService.addToCart(cartData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message); // Include only the error message
  }
});


export const createAnOrder = createAsyncThunk("user/cart/order/new", async (orderDetail, thunkAPI) => {
  try {
    return await createOrder(orderDetail);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message); // Include only the error message
  }
});



export const getUserCart = createAsyncThunk("user/cart/get", async (thunkAPI) => {
  try {
    return await getCartService.getCart();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message); // Include only the error message
  }
});

export const getOrders = createAsyncThunk("user/orders/get", async (thunkAPI) => {

  try {
    return await getUserOrders.getUserOrders();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message); // Include only the error message
  }
});




export const deleteCartProduct = createAsyncThunk("user/cart/product/delete", async (id,thunkAPI) => {
  try {
    return await removeProductFromCartService.removeProductFromCart(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message); // Include only the error message
  }
});

export const updateCartProduct = createAsyncThunk("user/cart/product/update", async (cartDetail,thunkAPI) => {
  try {
    return await updateProductFromCartService.updateProductFromCartService(cartDetail);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message); // Include only the error message
  }
});




export const updateProfile = createAsyncThunk("user/profile/update", async (data,thunkAPI) => {
  try {
    return await updateUser.updateUser(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message); // Include only the error message
  }
});


export const forgotPasswordToken = createAsyncThunk("user/password/forgot", async (data,thunkAPI) => {
  try {
    return await authService.forgotPassToken(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message); // Include only the error message
  }
});

export const resetPassword = createAsyncThunk("user/password/reset", async (data,thunkAPI) => {
  try {
    return await authService.resetPass(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message); // Include only the error message
  }
});



export const deleteUserCart = createAsyncThunk("user/cart/delete", async (data, thunkAPI) => {
  try {
    return await emptyCart.emptyCart(data);
  } catch (error) {
    console.error('Error emptying cart:', error);

    // Log more information about the error
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('No response received. Request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }

    // Return a rejected promise with the error message
    return Promise.reject(error.message);
  }
});




const initialState = {
  user: {
    cartProduct: null,

  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};


export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.createdUser = action.payload;
      if (state.isSuccess === true) {
        toast.info("User Created Successfully");
      }
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload; // Include the error message
      if (state.isError === true) {
        toast.error(action.payload.response.data.mess);
      }
    })
    .addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.user = action.payload;
      if (state.isSuccess === true) {
        localStorage.setItem("token", action.payload.token);
        toast.info("User Logged In Succesfully");
      }
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload?.error?.message || "An error occurred";
      if (state.isError === true) {
        toast.error(state.message);
      }
    })
    .addCase(AddProdTOCart.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(AddProdTOCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.user.cartProduct = action.payload || null; // Update to state.user.cartProduct
      if (state.isSuccess) {
        toast.success("Product Added To Cart");
      }
    })
    
    .addCase(AddProdTOCart.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload; // You can include the error message if needed
      toast.error("Failed to add product to cart");
    })
    .addCase(getUserCart.pending, (state)=>{
      state.isLoading=true;

    }).addCase(getUserCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.user.cartProduct = action.payload || null; // Update to state.user.cartProduct
    
    
    }).addCase(getUserCart.rejected,(state,action)=>{
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    })
    .addCase(deleteCartProduct.pending, (state)=>{
      state.isLoading=true;

    }).addCase(deleteCartProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.user.deletedCartProduct = action.payload || null;
      if(state.isSuccess){
        toast.success("Product Deleted From Cart Succesfully")
      }
    
    
    }).addCase(deleteCartProduct.rejected,(state,action)=>{
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      toast.error("Something Went Wrong");
    })
    .addCase(updateCartProduct.pending, (state)=>{
      state.isLoading=true;

    }).addCase(updateCartProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.user.updatedCartProduct = action.payload || null;
      if(state.isSuccess){
        toast.success("Product Updated From Cart Succesfully")
      }
    
    
    }).addCase(updateCartProduct.rejected,(state,action)=>{
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      toast.error("Something Went Wrong");
    })
  
    .addCase(createAnOrder.pending, (state)=>{
      state.isLoading=true;

    }).addCase(createAnOrder.fulfilled, (state, action) => {    
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.orderedProduct = action.payload;
      console.log('Ordered Products:', action.payload); // Log the ordered products

    
      if (state.isSuccess) {
        toast.success("Ordered Created Successfully");
      }
    })
    
    
    .addCase(createAnOrder.rejected,(state,action)=>{
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      if(state.isSuccess===false){
        toast.error("Something Went Wrong")
      }
    })
    .addCase(getOrders.pending, (state)=>{
      state.isLoading=true;

    }).addCase(getOrders.fulfilled, (state, action) => {    
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.getorderedProduct = action.payload;
  
    })
    
    
    .addCase(getOrders.rejected,(state,action)=>{
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
     
    })

    .addCase( updateProfile.pending, (state)=>{
      state.isLoading=true;

    }).addCase( updateProfile.fulfilled, (state, action) => {    
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.updatedUser = action.payload;

    
      if (state.isSuccess) {
        console.log(action.payload); 

        toast.success("Profile Updated Succesfully ");
      }
    })
    
    
    .addCase( updateProfile.rejected,(state,action)=>{
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      if(state.isSuccess===false){
        toast.error("Something Went Wrong")
      }
    })

 
    .addCase( forgotPasswordToken.pending, (state)=>{
      state.isLoading=true;

    }).addCase( forgotPasswordToken.fulfilled, (state, action) => {    
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.token = action.payload;
    
      if (state.isSuccess) {
        toast.success("Email Sent Succesfully ");
      }
    })
    
    
    .addCase( forgotPasswordToken.rejected,(state,action)=>{
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      if(state.isSuccess===false){
        toast.error("Something Went Wrong")
      }
    })

    .addCase( resetPassword.pending, (state)=>{
      state.isLoading=true;

    }).addCase( resetPassword.fulfilled, (state, action) => {    
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.pass = action.payload;
    
      if (state.isSuccess) {
        toast.success("Password Updated Succesfully ");
      }
    })
    
    
    .addCase( resetPassword.rejected,(state,action)=>{
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      if(state.isSuccess===false){
        toast.error("Something Went Wrong")
      }
    })

    .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = initialState.user; // Reset user state
        toast.info("User Logged Out Successfully");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        toast.error("Logout Failed");
      })
 

      .addCase( deleteUserCart.pending, (state)=>{
        state.isLoading=true;
  
      }).addCase( deleteUserCart.fulfilled, (state, action) => {    
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.pass = action.payload;
        state.deletedCart=action.payload;
       
      })
      
      
      .addCase( deleteUserCart.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
   
      })


  },
});

export default authSlice.reducer;

export const base_url = "http://localhost:4000/api/v1/register";

