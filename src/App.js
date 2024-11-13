import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import Home from './Pages/Home/Home';
import Menu from './Pages/Menu/Menu';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import Cart from './Pages/Cart/Cart';
import Footer from './Components/Footer/Footer';

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <Router>
      <div className="App">
        <NavBar cartItems={cartItems} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
