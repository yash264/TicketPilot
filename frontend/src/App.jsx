import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Home from "./pages/home";
import DashBoard from "./pages/dashBoard";


function App() {
  axios.defaults.withCredentials = true;

  const startServer = async () => {
    try {
      const response = await axios.get('https://ticketpilotserver-meta.vercel.app/startServer');

      console.log(response.data.message);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    startServer();
  }, [])

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
