import React from 'react';
import './home.page.scss';
import NavBar from '../../components/input/navbar.component/navbar.component';
import Body from '../../components/input/body.component/body.component';
// import AddTodo from '../../components/input/addtodo.component/addtodo.component';

  export default function Home(): React.ReactElement {

  return (
    <div className="mainpage--container">
      <NavBar />
      <Body/>
      {/* <AddTodo/>  */}
    </div>
  );
};

