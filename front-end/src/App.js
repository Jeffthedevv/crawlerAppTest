import React, { Component } from 'react';
import { Routes, Route } from "react-router-dom";
// import logo from './logo.svg';
// import './App.css';

import Landing from "./components/Landing/index";

class App extends Component {
  render() {
    return (
      <Routes> 
        <Route path="/" element={<Landing />} />
      </Routes>
    );
  }
}

export default App;