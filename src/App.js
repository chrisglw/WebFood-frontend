import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import Home from './Pages/Home/Home';
import Menu from './Pages/Menu/Menu';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import Cart from './Pages/Cart/Cart';
import Payment from './Pages/Payment/Payment';
import LogIn from './Pages/LogIn/LogIn';
import ManageMenu from './Pages/ManageMenu/ManageMenu';
import ManageOrders from './Pages/ManageOrders/ManageOrders';
import Footer from './Components/Footer/Footer';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [userRole, setUserRole] = useState(localStorage.getItem('role')); // Initialize from localStorage

    return (
        <Router>
            <div className="App">
                {/* Pass userRole and setUserRole to NavBar */}
                <NavBar cartItems={cartItems} userRole={userRole} setUserRole={setUserRole} />
                <div className="App-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/menu"
                            element={<Menu cartItems={cartItems} setCartItems={setCartItems} />}
                        />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route
                            path="/cart"
                            element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
                        />
                        <Route
                            path="/payment"
                            element={<Payment cartItems={cartItems} setCartItems={setCartItems} orders={orders} setOrders={setOrders} />}
                        />
                        <Route
                            path="/login"
                            element={<LogIn setUserRole={setUserRole} />} // Pass setUserRole to LogIn
                        />

                        {/* Protected routes */}
                        <Route
                            path="/manage-menu"
                            element={
                                <ProtectedRoute requiredRole="manager">
                                    <ManageMenu menuItems={menuItems} setMenuItems={setMenuItems} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/manage-orders"
                            element={
                                <ProtectedRoute requiredRole="staff">
                                    <ManageOrders orders={orders} setOrders={setOrders} />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
