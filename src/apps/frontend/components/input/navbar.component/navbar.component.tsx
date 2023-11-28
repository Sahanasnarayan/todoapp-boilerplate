import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.component.scss';
import { LuListTodo } from "react-icons/lu";
export default function NavBar(): React.ReactElement {

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('token');
    if (!user) {
      navigate('/');
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('accountId');
    navigate('/');
  }
  return (

    <div className="homepage-container">
      <div className="sidebar">
        <h1 className="app-name">
          <LuListTodo />
        </h1>
        <p className="app-title">To-do</p>
        <div className="user-details">
        </div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      <div className="main-content">
        {/* Your main content goes here */}
      </div>
    </div>


  );
};
