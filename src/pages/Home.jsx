import { useEffect, useState } from 'react'
import axios from 'axios'
import RecipeCard from '../components/RecipeCard.jsx'

export default function Home() {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    axios.get('/recipes?limit=12').then(({ data }) => setRecipes(data)).catch(() => setRecipes([]))
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Discover new recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {recipes.map((r) => (
          <RecipeCard key={r._id} recipe={r} />
        ))}
      </div>
    </div>
  )
}



