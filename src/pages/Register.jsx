import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../components/AuthContext.jsx'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      await register(name, email, password)
      navigate('/dashboard')
    } catch (e) {
      const data = e.response?.data
      const details = Array.isArray(data?.errors) ? data.errors.map(er => er.msg).join(', ') : data?.message
      setError(details || 'Registration failed')
    }
  }

  return (
    <form onSubmit={submit} className="max-w-md mx-auto bg-white border rounded-lg p-4 space-y-3">
      <h1 className="text-2xl font-bold">Create account</h1>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full border rounded p-2" placeholder="Name" required />
      <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="w-full border rounded p-2" placeholder="Email" required />
      <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="w-full border rounded p-2" placeholder="Password (min 6)" required />
      <button className="px-4 py-2 rounded bg-indigo-600 text-white w-full">Sign up</button>
      <div className="text-sm">Have an account? <Link to="/login" className="text-indigo-600">Login</Link></div>
    </form>
  )
}



