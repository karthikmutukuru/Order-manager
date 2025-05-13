import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const CreateOrder = () => {
  const [customerName, setCustomerName] = useState('');
  const [product, setProduct] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/orders', {
        customer_name: customerName,
        product,
      });
      navigate('/');
    } catch (err) {
      if (err.response?.status === 422) {
        alert('Validation failed. Please check your input.');
      } else {
        console.error('Error creating order:', err);
        alert('Failed to create order.');
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Create Order</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Customer Name:</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Product:</label>
          <input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateOrder;
