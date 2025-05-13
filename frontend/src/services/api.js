import axios from 'axios';

// Get CSRF token from cookies
const getCsrfToken = () => {
  const name = 'XSRF-TOKEN';
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'X-XSRF-TOKEN': getCsrfToken(),  // Add CSRF token here
  },
  withCredentials: true,  // Ensure credentials (cookies) are sent
});

API.get('/sanctum/csrf-cookie').then(() => {
  // After the CSRF token is set, make the orders request
  API.get('/orders')
    .then(response => {
      console.log('Orders fetched:', response.data);
    })
    .catch(error => {
      console.error('Error fetching orders:', error.response ? error.response : error);
      alert('Error fetching orders: ' + error.message);
    });
});


export default API;
