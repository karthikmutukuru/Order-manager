import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrderList from './pages/OrderList';
import CreateOrder from './pages/CreateOrder';
import EditOrder from './pages/EditOrder';
import OrderSummary from './pages/OrderSummary';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OrderList />} />
        <Route path="/create" element={<CreateOrder />} />
        <Route path="/edit/:id" element={<EditOrder />} />
        <Route path="/summary/:id" element={<OrderSummary />} />
      </Routes>
    </Router>
  );
}

export default App;
