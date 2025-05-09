import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('');

  const fetchOrders = async () => {
    try {
      const response = await API.get('/orders');
      setOrders(response.data);
    } catch (err) {
      console.error('Error loading orders:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filtered = orders.filter(order =>
    order.customer_name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>Order List</h2>
      <input
        placeholder="Search by customer"
        value={filter}
        onChange={e => setFilter(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px' }}
      />
      <br />
      <Link to="/create">+ Create Order</Link>
      <ul>
        {filtered.map(order => (
          <li key={order.id}>
            <strong>{order.customer_name}</strong> - {order.product}{' '}
            <Link to={`/edit/${order.id}`}>Edit</Link>{' '}
            <Link to={`/summary/${order.id}`}>Summary</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
