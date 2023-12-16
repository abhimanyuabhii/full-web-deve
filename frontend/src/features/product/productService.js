import axios from 'axios';

export const productService = {
  getProducts: async (userData) => {
    const response = await axios.get('http://localhost:4000/api/v1/products');
    return response.data;
  },
};

export const getSingleProduct = async (id) => {
  const response = await axios.get(`http://localhost:4000/api/v1/product/${id}`);
  return response.data;
};

export const rateProduct = async (data) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    withCredentials: true,
  };
  const response = await axios.put(`http://localhost:4000/api/v1/review`,data,config);
  return response.data;
};




export default productService;

