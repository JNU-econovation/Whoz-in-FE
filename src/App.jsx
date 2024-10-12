import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Join from './pages/join';

const App = () => {
  return(
  <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </Router>
  );
};


export default App;
