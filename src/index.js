import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Login from './pages/Login';
import Signup from './pages/Signup';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

export default function Home() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />}/>
        <Route exact path="login" element={<Login />} />
        <Route exact path="signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
);}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Home />);