import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup/Signup';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route path='/signup' element={<Signup />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);



