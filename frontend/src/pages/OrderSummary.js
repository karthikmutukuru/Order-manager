// src/pages/OrderSummary.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

const OrderSummary = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    API.get(`/orders/${id}`)
      .then(res => setOrder(res.data))
      .catch(err => console.error('Error loading order summary:', err));
  }, [id]);

  if (!order) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Order Summary</h2>
      <p><strong>Customer:</strong> {order.customer_name}</p>
      <p><strong>Product:</strong> {order.product}</p>
      <button onClick={() => window.print()}>Print</button>
    </div>
  );
};

export default OrderSummary;
