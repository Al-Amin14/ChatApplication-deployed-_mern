import React, { useState } from 'react'
import { appContext } from './context/appcontext';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login';
import Signup from './pages/signup';
import ChatSidebar from './pages/left';
import ChatUI from './pages/right';
import Chathome from './pages/chathome';

const App = () => {
  const [loggedin, setLoggedin] = useState(false);
  return (
    <BrowserRouter>
      <appContext.Provider value={{ loggedin }}>
        <Routes>
          <Route path='/' element={<Chathome/>}></Route>
        </Routes>
      </appContext.Provider>
    </BrowserRouter>
  )
}

export default App