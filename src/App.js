import { ThemeProvider } from '@emotion/react';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {Navbar} from './components/Navbar'
import {Footer} from './components/Footer'
import { BestSellers } from './pages/BestSellers';
import { Discover } from './pages/Discover';
import { Eyes } from './pages/Eyes';
import { Face } from './pages/Face';
import { Home } from './pages/Home';
import { Lips } from './pages/Lips';
import { ProductsByBrand } from './pages/ProductsByBrand';
import {theme} from './style/theme'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMakeup } from './rtk/app/features/makeUpSlice';
import { CartProduct } from './components/CartProduct';
import { ToastContainer } from 'react-toastify';
import { getTotal } from './rtk/app/features/cartSlice';
import { ProductDetails } from './components/ProductDetails';


function App() {

  const [openBrand, setOpenBrand] = React.useState(null);
  const cart = useSelector(state=>state.cart);
  //const totalQuantity = useSelector(state=>state.cart.totalQuantity);

  const dispatch = useDispatch();

  const updateOpenBrand = (brand) => {
    setOpenBrand(brand);
  }

  React.useEffect(() => {
    dispatch(fetchMakeup());
  }, [dispatch]);

  React.useEffect(()=> {
    dispatch(getTotal());
  },[cart,dispatch]);
  
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
         <Navbar/>
         <ToastContainer/>
         <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/discover' element={<Discover updateOpenBrand={updateOpenBrand}/>}/>
              <Route path='/eyes' element={<Eyes/>}/>
              <Route path='/face' element={<Face/>}/>
              <Route path='/lips' element={<Lips/>}/>
              <Route path='/bestsellers' element={<BestSellers/>}/>
            <Route path='/product_brands' element={<ProductsByBrand openBrand={openBrand}/>}/>
            <Route path='/display_cart' element={<CartProduct/>}/>
            <Route path='/product_details' element={<ProductDetails/>}/>
         </Routes>
         <Footer/>
      </BrowserRouter>   
    </ThemeProvider>
   
  );
}

export default App;
