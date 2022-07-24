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
  const [userId, setUserId] = useState();

  const login = useCallback((uid)=>{
    setIsLoggedIn(true);
    setUserId(uid);
  },[]);

  const logout = useCallback(()=>{
    setIsLoggedIn(false);
    setUserId(null);
  },[]);

  let routes;
  if(isLoggedIn){
    routes=(
      <Routes>
        <Route path="/" element={<Navigate to="/todo" />} />
        <Route path="/todo" element={<TodoList />} />
        <Route path="/signup" element={<Navigate to="/todo" />} />
      </Routes>
    )
  }
  else{
    routes=(
      <Fragment>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/todo" element={<Navigate to="/" />} />
      </Routes>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <AuthContext.Provider value={{isLoggedIn : isLoggedIn, userId : userId ,login : login, logout : logout}}>
      <Header />
      {routes}
      </AuthContext.Provider>
    </Fragment>
  );
}

export default App;
