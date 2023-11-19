import React, { useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

// import { Header, Footer } from './components';
// import { DepsProvider } from './contexts';
import { Config } from './helpers';
import { About, Login, NotFound, Register, Home} from './pages';
// import { AccessService } from './services';
import InspectLet from './vendor/inspectlet';

import './app.global.scss';

export default function App(): React.ReactElement {
  useEffect(() => {
    const inspectletKey = Config.getConfigValue('inspectletKey');

    if (inspectletKey) {
      InspectLet();
    }
  }, []);

  return (
    // <DepsProvider deps={{
    //   accessService: new AccessService(),
    // }}>
      <Router>
        <div className='container'>
          {/* <Header /> */}
          <Routes>
            <Route path='/about' element={<About />} />
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/home' element={<Home />} />
            <Route path='*' element={<NotFound />} />
            {/* <Route path='/home' element={<Home />} /> */}

          </Routes>
          {/* <Footer /> */}
        </div>
      </Router>
    // </DepsProvider>
  );
}





           
  