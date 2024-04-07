import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import About from './Pages/About';
import Home from './Pages/Home';
import DataFetch from './Pages/DataFetch';
import Admin from './Pages/Admin';

function App () {
   //[] so that the fetch data only done once, if you don't use the empty array, the process fetch will be done in a loop

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/data_fetch' element={<DataFetch />}/>
        <Route path='/admin' element={<Admin />}/>
      </Routes>
    </Router>
  );
}

export default App;
