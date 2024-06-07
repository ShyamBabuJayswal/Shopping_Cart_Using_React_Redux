import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Navbar from './components/Navbar';
import { Provider } from 'react-redux';
import store from './store/store';


function App() {
  

  return (
    <Provider store={store} >
      <div className='App'>
      
        <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
      </Provider>
    
  )
}

export default App
