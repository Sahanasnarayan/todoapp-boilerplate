import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.page.scss';
import { AccessService } from '../../services';


export default function Register(): React.ReactElement {

  const navigate = useNavigate();
  const accessService = new AccessService();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('accountId');
    if (userId) {
      navigate('/home');
    }
  }, []);

  const signup = useCallback(async (e) => {
    e.preventDefault();
    try {
      const user = await accessService.register(name, username, password);
      console.log(user);

      const object = await accessService.login(username, password);

      localStorage.setItem('token', object.data.token);
      localStorage.setItem('accountId', object.data.accountId);

      navigate(`/home`);
    } catch (e) {
      if (!name || !username || !password) {
        alert(`Please enter all the fields`);
      }
      if (e.response && e.response.status === 409) {
        alert(`This username is already registered. Please use a different username.`);
      } else if (e.response && e.response.status === 400) {
        const validationErrors = e.response.data.errors;
        console.log(validationErrors);
        alert(JSON.stringify(validationErrors, null, 2));

      }

      else {
        alert(`An error occurred. Please try again.`);

      }
    }
  }, [
    accessService,
    name,
    username,
    password,
    navigate
  ])

  return (
    <div className="wrapper1">
      <span className="bg-animate1"></span>
      <div className="form-block login1">
        <h2>Register</h2>
        <form >
          <div className="input-box1">
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label> Name</label>
          </div>
          <div className="input-box1">
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label> Username</label>
          </div>
          <div className="input-box1">
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label> Password</label>
          </div>
          <button className="btn1"
            onClick={signup}>
            Sign-up
          </button>
          <div className="logreg-link1">
            <p>Already have an account?
              <a onClick={() => navigate('/')} className="register-link">Sign-In</a>
            </p>
          </div>
        </form>
      </div>
      <div className="infotext login">
        <h2> Hello!<br></br> & Welcome</h2>
        <p>We're thrilled to have you on this journey!</p>
      </div>
    </div>
  );
};
