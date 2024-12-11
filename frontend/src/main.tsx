import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { AuthProvider, ProtectedRoute } from './contexts/AuthContext'
import { Home } from './pages/Home'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { Profile } from './pages/Profile'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './queryClient'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Navbar } from './components/Navbar'
import { Recipe } from './pages/Recipe'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <>
            <Navbar/>
            <div className='main-content'>
              <Routes>
                <Route index element={<Home/>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='register' element={<Register/>}/>
                <Route path='profile/*' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
                <Route path='recipe/:recipeId' element={<Recipe/>}/>
              </Routes>
            </div>
            <footer className='main-footer bg-dark-subtle d-flex align-items-center justify-content-center'>
              Copyright xd
            </footer>
          </>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
)
