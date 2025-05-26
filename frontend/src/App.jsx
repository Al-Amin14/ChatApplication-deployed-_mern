import React, { useEffect, useState } from 'react'
import { appContext } from './context/appcontext';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login';
import Signup from './pages/signup';
import ChatSidebar from './pages/left';
import ChatUI from './pages/right';
import Chathome from './pages/chathome';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const [loggedin, setLoggedin] = useState(false);

  return (
    <BrowserRouter>
      <appContext.Provider value={{ loggedin }}>
        <Routes>
          <Route path='/' element={<Chathome />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          />
      </appContext.Provider>
    </BrowserRouter>
  )
}

export default App