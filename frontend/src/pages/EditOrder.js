// src/pages/EditOrder.js
import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const EditOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState({ customer_name: '', product: '' });

  useEffect(() => {
    API.get(`/orders/${id}`)
      .then(res => setOrder(res.data))
      .catch(err => {
        console.error('Error fetching order:', err);
        alert('Order not found');
      });
  }, [id]);

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.put(`/orders/${id}`, order)
      .then(() => navigate('/'))
      .catch(err => {
        console.error('Update failed:', err);
        alert('Update failed.');
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <h2>Edit Order</h2>
      <div>
        <label>Customer Name:</label>
        <input
          name="customer_name"
          value={order.customer_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Product:</label>
        <input
          name="product"
          value={order.product}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Update</button>
    </form>
  );
};

export default EditOrder;
