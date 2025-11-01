import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Product from "./pages/Product";
import { Products } from "./pages/Products";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/products' element={<Products />} />
      </Routes>

    </BrowserRouter>
  );
}


export default App;