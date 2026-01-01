import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import DashBoard from "./pages/dashBoard";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/dashBoard" element={<DashBoard />} />
      </Routes>
    </>
  );
}

export default App;
