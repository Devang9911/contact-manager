import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './pages/Header'
import Footer from './pages/Footer'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import AddContact from './pages/AddContact'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ProtectedRoutes from './protectedroutes/ProtectedRoutes'
import Popup from './popup/Popup'


function App() {

  return (
    <>
      <Header />
      <Popup/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={
          <ProtectedRoutes>
            <Dashboard/>
          </ProtectedRoutes>
        }/>
        <Route path='/addcontact' element={
          <ProtectedRoutes>
            <AddContact/>
          </ProtectedRoutes>
        }/>
      </Routes>

      <Footer/>
    </>
  )
}

export default App
