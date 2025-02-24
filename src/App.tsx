import './App.css'
import { Toaster } from 'react-hot-toast';
import { Test } from './report/pages/Test';
import MainNavigation from './navigation/pages/MainNavigation';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './login/pages/LoginPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/*" element={<Navigate to="/login" />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/test" element={<Test />} />
        <Route path="/main" element={<MainNavigation />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  )
}

export default App
