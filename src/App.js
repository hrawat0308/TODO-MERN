import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import './App.css';
import { Fragment } from "react";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";


function App() {
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" exact element={<Signup />} />
      </Routes>
      
    </Fragment>
  );
}

export default App;
