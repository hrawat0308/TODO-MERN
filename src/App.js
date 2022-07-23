import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import './App.css';
import { Fragment } from "react";


function App() {
  return (
    <Fragment>
      <Header />
      <Outlet />
    </Fragment>
  );
}

export default App;
