import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminLogin from './AdminLogin'
import AdminLayout from './AdminLayout'
import AdminDashboard from './AdminDashboard'
import AdminAppointments from './AdminAppointments'
import AdminGallery from './AdminGallery'
import AdminServices from './AdminServices'

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    try {
      const loggedIn = localStorage.getItem('adminLoggedIn') === 'true'
      setIsAuthenticated(loggedIn)
    } catch (error) {
      console.error('Error accessing localStorage:', error)
      setIsAuthenticated(false)
    }
    setLoading(false)
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    try {
      localStorage.removeItem('adminLoggedIn')
    } catch (error) {
      console.error('Error accessing localStorage:', error)
    }
    setIsAuthenticated(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return (
    <AdminLayout onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/appointments" element={<AdminAppointments />} />
        <Route path="/gallery" element={<AdminGallery />} />
        <Route path="/services" element={<AdminServices />} />
      </Routes>
    </AdminLayout>
  )
}

export default Admin

