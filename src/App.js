import Header from "./components/Header/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import { Fragment, useCallback, useState } from "react";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import TodoList from "./components/Todolist/TodoList";
import { AuthContext } from './Context/Auth-Context';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(()=>{
    setIsLoggedIn(true);
  },[]);

  const logout = useCallback(()=>{
    setIsLoggedIn(false);
  },[]);

  let routes;
  if(isLoggedIn){
    routes=(
      <Routes>
        <Route path="/" element={<Navigate to="/:userId/todo" />} />
        <Route path="/:userId/todo" element={<TodoList />} />
      </Routes>
    )
  }
  else{
    routes=(
      <Fragment>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/:userId/todo" element={<Navigate to="/" />} />
      </Routes>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <AuthContext.Provider value={{isLoggedIn : isLoggedIn, login : login, logout : logout}}>
      <Header />
      {routes}
      </AuthContext.Provider>
    </Fragment>
  );
}

export default App;
