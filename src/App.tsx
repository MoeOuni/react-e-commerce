import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NavBar from "./components/NavBar";
import Product from "./pages/Product";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/product/:id' element={<Product />} />

        </Routes>
    
    </BrowserRouter>
  );
}


export default App;