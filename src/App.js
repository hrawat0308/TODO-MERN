import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import './App.css';
import { Fragment } from "react";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import TodoList from "./components/Todolist/TodoList";


function App() {
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/:userId/todo" element={<TodoList />} />
      </Routes>
      
    </Fragment>
  );
}

export default App;
