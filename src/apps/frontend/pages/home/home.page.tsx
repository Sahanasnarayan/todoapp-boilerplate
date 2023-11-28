import React from 'react';
import './home.page.scss';
import NavBar from '../../components/input/navbar.component/navbar.component';
import Body from '../../components/input/body.component/body.component';

export default function Home(): React.ReactElement {

  return (
    <div className="mainpage--container">
      <NavBar />
      <Body />
    </div>
  );
};

