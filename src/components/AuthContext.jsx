import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios'

const AuthCtx = createContext(null)

// const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://recipe-sharing-platform-be-1.onrender.com/api' : 'http://localhost:5000/api')
axios.defaults.baseURL = API_BASE

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'))

  useEffect(() => {
    if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    else delete axios.defaults.headers.common['Authorization']
  }, [token])

  const login = async (email, password) => {
    const { data } = await axios.post('/auth/login', { email, password })
    setToken(data.token)
    setUser(data.user)
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
  }

  const register = async (name, email, password) => {
    const { data } = await axios.post('/auth/register', { name, email, password })
    setToken(data.token)
    setUser(data.user)
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
  }

  const logout = () => {
    setToken('')
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const value = useMemo(() => ({ user, token, login, register, logout, setUser }), [user, token])

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}

export function useAuth() {
  return useContext(AuthCtx)
}



