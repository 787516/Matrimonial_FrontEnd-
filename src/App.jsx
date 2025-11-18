import React from 'react'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import { UserProvider } from './context/UserContext'
import { ChatProvider } from './context/ChatContext'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <ChatProvider>
          <AppRoutes />
        </ChatProvider>
      </UserProvider>
    </AuthProvider>
  )
}

export default App
