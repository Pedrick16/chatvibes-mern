
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";


import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import axios from "axios";
import {Toaster} from 'react-hot-toast'
import { UserContextProvider } from "./context/userContext";



axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;


const App = () => {
  return (
    <UserContextProvider>
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        
          <Route path="/room" element={<MainPage />} />
         
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App
