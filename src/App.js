import React, { Suspense} from 'react';
import Header from "./components/Header/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import { Fragment, useCallback, useState, useEffect } from "react";
import Login from "./components/Login/Login";
import { AuthContext } from './Context/Auth-Context';
import LoadingSpinner from './components/Spinner/LoadingSpinner';

const TodoList = React.lazy(()=> import("./components/Todolist/TodoList")); 
const Signup = React.lazy(() => import("./components/Signup/Signup"));

let logoutTimer;

function App() {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState();
  const [tokenExpirationDate, setTokenExpirationData] = useState();

  const login = useCallback((uid, token, expirationDate)=>{
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationData(tokenExpirationDate);
    localStorage.setItem('userData', 
                          JSON.stringify({  userId : uid, 
                                            token : token,
                                            expiration : tokenExpirationDate.toISOString()
                                          }));
  },[]);

  const logout = useCallback(()=>{
    setToken(null);
    setUserId(null);
    setTokenExpirationData(null);
    localStorage.removeItem('userData');
  },[]);


  useEffect(()=>{
    if(token && tokenExpirationDate){
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    }else{
      clearTimeout(logoutTimer)
    }
  },[token, logout, tokenExpirationDate]);

  useEffect(()=>{
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if(storedData && storedData.token && new Date(storedData.expiration) > new Date()){
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  },[login]);

  let routes;
  if(token){
    routes=(
      <Routes>
        <Route path="/" element={<Navigate to="/todo" />} />
        <Route path="/todo" element={<TodoList />} />
        <Route path="/*" element={<Navigate to="/todo" />} />
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
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <AuthContext.Provider value={{isLoggedIn : !!token, token : token ,userId : userId ,login : login, logout : logout}}>
      <Header />
      <Suspense fallback={
        <div className='center'>
          <LoadingSpinner />
        </div>
      }>
      {routes}
      </Suspense>
      </AuthContext.Provider>
    </Fragment>
  );
}

export default App;
