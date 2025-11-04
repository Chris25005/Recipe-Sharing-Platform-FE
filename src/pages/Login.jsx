import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../components/AuthContext.jsx'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (e) {
      const data = e.response?.data
      const details = Array.isArray(data?.errors) ? data.errors.map(er => er.msg).join(', ') : data?.message
      setError(details || 'Login failed')
    }
  }

  return (
    <form onSubmit={submit} className="max-w-md mx-auto bg-white border rounded-lg p-4 space-y-3">
      <h1 className="text-2xl font-bold">Login</h1>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="w-full border rounded p-2" placeholder="Email" required />
      <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="w-full border rounded p-2" placeholder="Password" required />
      <button className="px-4 py-2 rounded bg-indigo-600 text-white w-full">Login</button>
      <div className="text-sm">No account? <Link to="/register" className="text-indigo-600">Register</Link></div>
    </form>
  )
}



