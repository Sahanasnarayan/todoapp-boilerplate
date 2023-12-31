import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccessService } from '../../../services';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginData(): React.ReactElement {
  const navigate = useNavigate();
  const accessService = new AccessService();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('accountId');
    if (userId) {
      navigate('/home');
    }
  }, []);

  const login = useCallback(async (e) => {
    e.preventDefault();

    try {
      const object = await accessService.login(username, password);
      localStorage.setItem('token', object.data.token);
      localStorage.setItem('accountId', object.data.accountId);
      toast.success('User logged in Successfully');
      navigate(`/home`);
    } catch (e) {
      if (!username || !password) {
        toast.warning('Please enter username and password.');
      }
      else if (e.response.status == 404) {
        toast.error('User Not Found');
      }
      else if (e.response.status === 401) {
        toast.error('Invalid Credentials. Please try again.');
      }
      else {
        toast.error('An error occurred. Please try again.');
      }
      console.log(e);
    }
  }, [
    accessService,
    username,
    password,
  ]);
  return (

    <div className="wrapper">
      <span className="bg-animate"></span>
      <div className="form-box login">
        <h2>Login</h2>
        <form >
          <div className="input-box">
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label> Username</label>
          </div>
          <div className="input-box">
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label> Password</label>
          </div>
          <button className="btn" onClick={login}>
            <p className="btntext">Login</p>
          </button>
          <div className="logreg-link">
            <p>Don't have an account?
              <a onClick={() => navigate('/register')} className="register-link">Sign Up</a>
            </p>
          </div>
        </form>
      </div>
      <div className="info-text login">
        <h2> Welcome back</h2>
        <p>Let's simplify your life by organizing tasks.</p>
      </div>
      <ToastContainer/>
    </div>
  );
}