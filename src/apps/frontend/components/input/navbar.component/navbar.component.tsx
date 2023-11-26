import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.component.scss';
export default function NavBar(): React.ReactElement {

  const navigate = useNavigate();

  useEffect(() => {
      const user = localStorage.getItem('token');
      if(!user) {
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
        <h1 className="app-name">Your Todo App</h1>
        <div className="user-details">
          <p>Welcome, John Doe!</p>
        </div>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      <div className="main-content">
        {/* Your main content goes here */}
      </div>
    </div>


  );
};
