// axiosconfig.js
export const token = localStorage.getItem('token');
document.cookie = `token=${token};`;

export const config = {
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};
