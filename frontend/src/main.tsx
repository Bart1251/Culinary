import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { AuthProvider, ProtectedRoute } from './contexts/AuthContext'
import { Home } from './pages/Home'
import './index.css'
import { Profile } from './pages/Profile'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './queryClient'
import { Login } from './pages/Login'
import { Register } from './pages/Register'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route index element={<Home/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='register' element={<Register/>}/>
            <Route path='profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
)
