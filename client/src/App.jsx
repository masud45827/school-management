import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import Teacher from './components/Teacher'
import Student from './components/Student'
import Notice from './components/Notice'
import Result from './components/Result'
import LoginPage from './components/LoginPage'
import Check from './components/Check'
import RegisterPage from './components/RegisterPage'
import AdminPanel from './components/AdminPanel'
import LogoutPage from './components/LogoutPage'

function App() {

  return (
    <div className='m-2'>
     <BrowserRouter>
    <Header/>
     <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/teacher' element={<Teacher/>}/>
      <Route path='/student' element={<Student/>}/>
      <Route path='/notice' element={<Notice/>}/>
      <Route path='/result' element={<Result/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/logout' element={<LogoutPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/admin' element={<AdminPanel/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </div>
  )
}

export default App
