import React from 'react';
import './navbar.component.scss';

export default function NavBar(): React.ReactElement {

    // import "../css/navbar.css";
    // import logo from "../../../assets/todo_logo.png"
    

    
        // const handleLogout = () => {
        //     localStorage.removeItem("token");
        //     window.location.href = "/";
        // }
        return (
            <div className="navbar--container">
                <div className="nav--logo--container">
                    {/* <img src={logo} alt="todo logo" className="nav__logo"/> */}
                    <h1 className="nav__title">TODO-APP</h1>
                </div>
                <button className="nav__logout__btn"
                    // onClick={()=>handleLogout()}
                >Logout</button>
            </div>
     
    

  );
};
