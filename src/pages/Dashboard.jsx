import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../components/AuthContext.jsx'
import RecipeCard from '../components/RecipeCard.jsx'

export default function Dashboard() {
  const { user } = useAuth()
  const [me, setMe] = useState(null)
  const [myRecipes, setMyRecipes] = useState([])
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    axios.get('/users/me').then(({ data }) => setMe(data)).catch(() => setMe(null))
    axios.get('/recipes?limit=100').then(({ data }) => setMyRecipes(data.filter(r => r.author?._id === user?.id))).catch(() => setMyRecipes([]))
    axios.get('/users/me/favorites').then(({ data }) => setFavorites(data)).catch(() => setFavorites([]))
  }, [user])

  return (
    <div className="space-y-4">
      <div className="bg-white border rounded-lg p-4">
        <h1 className="text-2xl font-bold">Welcome, {me?.name}</h1>
        <div className="text-sm text-gray-600">Followers: {me?.followersCount} · Following: {me?.followingCount}</div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Your recipes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {myRecipes.map((r) => <RecipeCard key={r._id} recipe={r} />)}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Favorites</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favorites.map((r) => <RecipeCard key={r._id} recipe={r} />)}
        </div>
      </div>
    </div>
  )
}


