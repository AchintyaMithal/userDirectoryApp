import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserDirectory from './components/UserDirectory';
import UserDetail from './components/UserDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserDirectory />} />
        <Route path="/user/:userId" element={<UserDetail />} />
        <Route path="/user-directory" element={<UserDirectory />} />
      </Routes>
    </Router>
  );
};

export default App;
