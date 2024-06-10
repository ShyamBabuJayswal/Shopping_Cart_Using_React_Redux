# 🛒 Shopping Cart Using React & Redux

Welcome to the **Shopping Cart Using React & Redux** project! This project demonstrates a simple shopping cart application built with React, Redux Toolkit, and React Router.

## 🌟 Features

- **Product Listing**: Fetch and display products from an external API.
- **Add to Cart**: Add products to the cart.
- **Remove from Cart**: Remove products from the cart.
- **Navigation**: Navigate between the Home and Cart pages using React Router.

## 📂 Project Structure

```plaintext
├── src
│   ├── components
│   │   ├── Navbar.js
│   │   └── Products.js
│   ├── pages
│   │   ├── Cart.js
│   │   └── Home.js
│   ├── store
│   │   ├── cartSlice.js
│   │   ├── productSlice.js
│   │   └── store.js
│   ├── App.css
│   ├── App.js
│   └── index.js
├── README.md
├── package.json
└── .gitignore
```

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm (or yarn)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ShyamBabuJayswal/Shopping_Cart_Using_React_Redux.git
cd Shopping_Cart_Using_React_Redux
```

2. Install dependencies:

```bash
npm install
```

### Running the Application

Start the development server:

```bash
npm start
```

## 🛠️ Code Overview

### Navbar Component

Displays the navigation links and the cart item count.

```javascript
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const items = useSelector((state) => state.cart);
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="logo">REDUX STORE</span>
            <div>
                <Link className="navLink" to="/">Home</Link>
                <Link className="navLink" to="/cart">Cart</Link>
                <span className="cartCount">Cart items: {items.length}</span>
            </div>
        </div>
    );
};

export default Navbar;
```

### Products Component

Fetches and displays products, allows adding products to the cart.

```javascript
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../store/cartSlice';
import { fetchProducts } from '../store/productSlice';
import { STATUSES } from '../store/productSlice';

const Products = () => {
    const dispatch = useDispatch();
    const { data: products, status } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    const handleAdd = (product) => {
        dispatch(add(product));
    };

    if (status === STATUSES.LOADING) {
        return <h2>Loading....</h2>;
    }

    if (status === STATUSES.ERROR) {
        return <h2>Something went wrong!</h2>;
    }

    return (
        <div className="productsWrapper">
            {products.map((product) => (
                <div className="card" key={product.id}>
                    <img src={product.image} alt="" />
                    <h4>{product.title}</h4>
                    <h5>{product.price}</h5>
                    <button onClick={() => handleAdd(product)} className="btn">Add to cart</button>
                </div>
            ))}
        </div>
    );
};

export default Products;
```

### Cart Component

Displays products in the cart and allows removing products from the cart.

```javascript
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { remove } from '../store/cartSlice';

const Cart = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.cart);

    const handleRemove = (productId) => {
        dispatch(remove(productId));
    };

    return (
        <div>
            <h3>Cart</h3>
            <div className="cartWrapper">
                {products.map((product) => (
                    <div key={product.id} className="cartCard">
                        <img src={product.image} alt="" />
                        <h5>{product.title}</h5>
                        <h5>{product.price}</h5>
                        <button className="btn" onClick={() => handleRemove(product.id)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cart;
```

### Home Component

Displays the home page with a welcome message and the Products component.

```javascript
import React from 'react';
import Products from '../components/Products';

const Home = () => {
    return (
        <div>
            <h2 className="heading">Welcome to the Redux toolkit store</h2>
            <section>
                <h3>Products</h3>
                <Products />
            </section>
        </div>
    );
};

export default Home;
```

### Redux Store Setup

#### Cart Slice

```javascript
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        add(state, action) {
            state.push(action.payload);
        },
        remove(state, action) {
            return state.filter((item) => item.id !== action.payload);
        },
    },
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
```

#### Product Slice

```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    return data;
});

const productSlice = createSlice({
    name: 'product',
    initialState: {
        data: [],
        status: STATUSES.IDLE,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.status = STATUSES.ERROR;
            });
    },
});

export default productSlice.reducer;
```

#### Store Configuration

```javascript
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productReducer from './productSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        product: productReducer,
    },
});

export default store;
```

### App Component

Sets up the Redux provider and React Router.

```javascript
import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </Provider>
    );
}

export default App;
```

## 📧 Contact
For any inquiries, please contact [Shyam Babu Jayswal](shyambabu_jayswal@yahoo.com).
