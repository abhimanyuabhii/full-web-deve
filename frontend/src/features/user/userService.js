import axios from 'axios';


export const authService = {
  register: async (userData) => {
    const response = await axios.post('api/v1/register', userData);
    return response.data;
  },

  login: async (userData) => {
    const response = await axios.post('http://localhost:4000/api/v1/login', userData);
    return response.data;
  },

  forgotPassToken : async (data) => {
    const response = await axios.post('http://localhost:4000/api/v1/password/forgot', data);
    return response.data;
  },
resetPass: async (data) => {
  console.log(data.token);

  const response = await axios.put(`http://localhost:4000/api/v1/${data.token}`, {
    Password: data?.Password,
    ConfirmPassword: data?.confirmPassword
  });
  
  return response.data;
},


 

};

export const cartService = {
  addToCart: async (cartData) => {
    const token = localStorage.getItem('token');
    document.cookie = `token=${token};`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    const response = await axios.post('http://localhost:4000/api/v1/user/cart', cartData, config);
    return response.data;
  },
};


export const getCartService = {
  getCart: async () => {
    const token = localStorage.getItem('token');
const config = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  withCredentials: true,
};
    const response = await axios.get('http://localhost:4000/api/v1/user/cart', config);
    return response.data;
  },
};




export const removeProductFromCartService = {
  removeProductFromCart: async (cartItemId) => {
    const token = localStorage.getItem('token');
    document.cookie = `token=${token};`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };
    
    // Include the data payload in the URL parameters
    const response = await axios.delete(`http://localhost:4000/api/v1/user/delete-product-cart/${cartItemId}`, config);
    return response.data;
  },
}


export const updateProductFromCartService = {
  updateProductFromCartService: async (cartDetail) => {
    const token = localStorage.getItem('token');
    document.cookie = `token=${token};`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    const { cartItemId, Quantity } = cartDetail;
    const response = await axios.put(
      `http://localhost:4000/api/v1/user/update-product-cart/${cartItemId}`,
      { quantity: Quantity }, // Send the new quantity in the request body
      config
    );
    return response.data;
  },
};


export const createOrder = async (orderDetail) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    withCredentials: true, // If you still need credentials in your specific case
  };

  try {
    const response = await axios.post(
      'http://localhost:4000/api/v1/order/new',
      orderDetail,
      config
    );

    if (response.data) {
      return response.data;
    } else {
      throw new Error('Invalid response from the server');
    }
  } catch (error) {
    // Handle errors here, you might want to log or rethrow the error
    console.error('Error in createOrder:', error);
    throw error;
  }
};


export const getUserOrders =  {
  getUserOrders:async()=>{
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    withCredentials: true,
  };

  try {
    const response = await axios.get('http://localhost:4000/api/v1/orders/myOrders', config);

    if (response.data) {
      return response.data;
    } else {
      // If response.data is undefined, throw an error or return a meaningful value
      throw new Error('No data in the response');
    }
  } catch (error) {
    console.error('Error in getUserOrders:', error);
    throw error;
  }

  }
}

export const updateUser = {
  updateUser: async (data) => {
    const token = localStorage.getItem('token');
    document.cookie = `token=${token};`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };
    try {
      const response = await axios.put('http://localhost:4000/api/v1/me/update', data,config);
  
      if (response.data) {
        return response.data;
      } else {
        throw new Error('No data in the response');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }


  }
}


export const emptyCart = {
  emptyCart: async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the authorization token
      },
      withCredentials: true,
    };

    try {
      const response = await axios.delete('http://localhost:4000/api/v1/empty-cart', config);
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.error('Error emptying cart:', error);
      // Handle error appropriately (e.g., show a message to the user)
    }
  },
};






export default authService;
