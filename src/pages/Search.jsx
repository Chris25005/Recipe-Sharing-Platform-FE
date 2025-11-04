import { useEffect, useState } from 'react'
import axios from 'axios'
import RecipeCard from '../components/RecipeCard.jsx'

export default function Search() {
  const [q, setQ] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [dietary, setDietary] = useState('')
  const [mealType, setMealType] = useState('')
  const [minRating, setMinRating] = useState('')
  const [results, setResults] = useState([])

  const search = async (e) => {
    e?.preventDefault()
    const params = {}
    if (q) params.q = q
    if (ingredients) params.ingredients = ingredients
    if (dietary) params.dietary = dietary
    if (mealType) params.mealType = mealType
    if (minRating) params.minRating = minRating
    const { data } = await axios.get('/search', { params })
    setResults(data)
  }

  useEffect(() => { search() }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Search recipes</h1>
      <form onSubmit={search} className="grid md:grid-cols-5 gap-3 bg-white border rounded-lg p-3 mb-4">
        <input value={q} onChange={(e)=>setQ(e.target.value)} className="border rounded p-2" placeholder="Keyword" />
        <input value={ingredients} onChange={(e)=>setIngredients(e.target.value)} className="border rounded p-2" placeholder="Ingredients (comma-separated)" />
        <input value={dietary} onChange={(e)=>setDietary(e.target.value)} className="border rounded p-2" placeholder="Dietary (comma-separated)" />
        <select value={mealType} onChange={(e)=>setMealType(e.target.value)} className="border rounded p-2">
          <option value="">Any meal</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
          <option value="dessert">Dessert</option>
          <option value="drink">Drink</option>
          <option value="side">Side</option>
        </select>
        <input value={minRating} onChange={(e)=>setMinRating(e.target.value)} className="border rounded p-2" placeholder="Min Rating (1-5)" />
        <div className="md:col-span-5">
          <button className="px-4 py-2 rounded bg-gray-800 text-white">Search</button>
        </div>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {results.map((r) => <RecipeCard key={r._id} recipe={r} />)}
      </div>
    </div>
  )
}


