import React, { useState } from 'react';
import './ProductList.css';
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";
import CartItem from './CartItem';

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [showPlants, setShowPlants] = useState(false);
  const dispatch = useDispatch();

  // ✅ Access Redux cart items
  const cartItems = useSelector((state) => state.cart.items);

  // ✅ Function to get total quantity
  const calculateTotalQuantity = () => {
    return cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
  };

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowPlants(true);
    setShowCart(false);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  // ✅ Plants Data
  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: 15,
        },
        {
          name: "Spider Plant",
          image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          description: "Filters formaldehyde and xylene from the air.",
          cost: 12,
        },
      ],
    },
  ];

  const navStyle = {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '20px',
  };

  const linkStyle = {
    color: 'white',
    fontSize: '24px',
    textDecoration: 'none',
    marginLeft: '20px',
  };

  return (
    <div>
      {/* Navbar */}
      <div className="navbar" style={navStyle}>
        <div className="logo">
          <img
            src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
            alt="logo"
            style={{ width: '50px', height: '50px', marginRight: '10px' }}
          />
          <a href="/" onClick={handleHomeClick} style={linkStyle}>
            <h3>Paradise Nursery</h3>
          </a>
        </div>

        <div className="nav-links">
          <a href="#" onClick={handlePlantsClick} style={linkStyle}>Plants</a>
          <a href="#" onClick={handleCartClick} style={linkStyle}>
            🛒 Cart ({calculateTotalQuantity()})
          </a>
        </div>
      </div>

      {/* Product Section */}
      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index}>
              <h1>{category.category}</h1>
              <div className="product-list">
                {category.plants.map((plant, plantIndex) => {
                  // ✅ Check if this plant is already in the cart
                  const isInCart = cartItems.some(item => item.name === plant.name);

                  return (
                    <div className="product-card" key={plantIndex}>
                      <img
                        className="product-image"
                        src={plant.image}
                        alt={plant.name}
                      />
                      <div className="product-title">{plant.name}</div>
                      <div className="product-description">{plant.description}</div>
                      <div className="product-cost">${plant.cost}</div>
                      <button
                        className="product-button"
                        onClick={() => handleAddToCart(plant)}
                        disabled={isInCart} // ✅ Disable only if in cart
                      >
                        {isInCart ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
