import './App.css'
import { Toaster } from 'react-hot-toast';
import { Test } from './report/pages/Test';
import HomePage from './navigation/pages/HomePage';
import TablerosGeneralPage from './navigation/pages/TablerosGeneralPage';
import TablerosModuloPage from './navigation/pages/TablerosModuloPage';
import TablerosDashboardPage from './navigation/pages/TablerosDashboardPage';
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
        <Route path="/home" element={<HomePage />} />
        <Route path="/test" element={<Test />} />
        <Route path="/tableros" element={<TablerosGeneralPage />} />
        <Route path="/tableros/modulo/:idModule" element={<TablerosModuloPage />} />
        <Route path="/tableros/modulo/:idModule/dashboard/:idReport" element={<TablerosDashboardPage />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  )
}

export default App
