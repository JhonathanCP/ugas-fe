import './App.css'
import { Toaster } from 'react-hot-toast';
import { Test } from './report/pages/Test'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './login/pages/LoginPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/*" element={<Navigate to="/login" />} />
        <Route path="/test" element={<Test />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  )
}

export default App
