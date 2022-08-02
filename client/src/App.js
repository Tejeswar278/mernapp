import React from "react";
import {Route,Routes} from 'react-router-dom';
import Login from "./components/Login";
import Product from "./components/product";
import Register from "./components/Register";


const App = () => {
    return <div>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/product" element={<Product/>} />
            </Routes>
    </div>
}

export default App