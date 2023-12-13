import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ProtectedData from "./components/ProtectedData";
import {Toaster} from 'react-hot-toast';

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;      

function App() {
  return (
     <>
      <Toaster position='bottom-right' testOptions = {{duration:2000}}/>
      <Routes>
        <Route path="/register" element={<RegisterForm/>} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/" element={<ProtectedData/>} />
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
      />
      </Routes>
      </>
 
  );
}

export default App;