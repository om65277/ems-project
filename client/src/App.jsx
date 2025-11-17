import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Loginpage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedLayout from './layout/ProtectedLayout'
import AddEmployeePage from './pages/AddEmployeePage'
import AllEmployeePage from './pages/AllEmployeePage'
import UpdateEmployee from './pages/UpdateEmployee'

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        <Route element={<ProtectedLayout />}>
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/add-employee' element={<AddEmployeePage />} />
          <Route path='/all-employee' element={<AllEmployeePage />} />
          <Route path='/update-employee/:id' element={<UpdateEmployee />} />
        </Route>

      
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

      </Routes>

      <Footer />
    </>
  )
}

export default App
