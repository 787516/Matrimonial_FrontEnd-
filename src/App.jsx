import React from 'react'
import './App.css'
import { AuthProvider } from './context/AuthContext'
//import { UserProvider } from './context/UserContext'
import { SocketContextProvider } from "./context/SocketContext.jsx";
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <AuthProvider>
      {/* <UserProvider> */}
         <SocketContextProvider>
          <AppRoutes />
        </SocketContextProvider>
      {/* </UserProvider> */}
    </AuthProvider>
  )
}

export default App
