import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import RecipeDetail from './pages/RecipeDetail.jsx'
import SubmitRecipe from './pages/SubmitRecipe.jsx'
import Search from './pages/Search.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Profile from './pages/Profile.jsx'
import Dashboard from './pages/Dashboard.jsx'
import MealPlanner from './pages/MealPlanner.jsx'
import Users from './pages/Users.jsx'
import { AuthProvider, useAuth } from './components/AuthContext.jsx'

function Nav() {
  const { user, logout } = useAuth()
  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-pink-600">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4 text-white">
        <Link to="/" className="font-semibold tracking-wide">RecipeWeb</Link>
        <Link to="/search" className="hover:opacity-90">Discover</Link>
        <Link to="/submit" className="hover:opacity-90">Share</Link>
        <Link to="/planner" className="hover:opacity-90">Meal Planner</Link>
        {user && (
          <Link to="/users" className="hover:opacity-90">Users</Link>
        )}
        <div className="ml-auto flex items-center gap-3">
          {user ? (
            <>
              <Link to="/dashboard" className="hover:opacity-90">Dashboard</Link>
              <button onClick={logout} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:opacity-90">Login</Link>
              <Link to="/register" className="px-3 py-1 rounded bg-white text-indigo-700">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

function PrivateRoute({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" />
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
        <Nav />
        <main className="flex-1 max-w-6xl mx-auto p-4 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/submit" element={<PrivateRoute><SubmitRecipe /></PrivateRoute>} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/planner" element={<PrivateRoute><MealPlanner /></PrivateRoute>} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  )
}


