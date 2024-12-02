import React from 'react';
import Auth from './components/Auth';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import List from './components/List';

const App: React.FC = () => {
  return (
    <div className='w-full min-h-[100vh] flex items-center'>
      <Router>
        <Routes>
          <Route path='/auth' element={<Auth />} />
          <Route path='/' element={<List />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;