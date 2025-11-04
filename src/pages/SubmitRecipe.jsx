import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Uploader from '../components/Uploader.jsx'

export default function SubmitRecipe() {
  const [title, setTitle] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [steps, setSteps] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [mealType, setMealType] = useState('dinner')
  const [dietary, setDietary] = useState('')
  const [servings, setServings] = useState(2)
  const [time, setTime] = useState(30)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    const payload = {
      title,
      ingredients: ingredients.split('\n').filter(Boolean),
      steps: steps.split('\n').filter(Boolean),
      imageUrls: imageUrl ? [imageUrl] : [],
      videoUrl,
      cuisine,
      mealType,
      dietary: dietary.split(',').map((s)=>s.trim()).filter(Boolean),
      servings: Number(servings),
      cookingTimeMinutes: Number(time)
    }
    const { data } = await axios.post('/recipes', payload)
    navigate(`/recipe/${data._id}`)
  }

  return (
    <form onSubmit={submit} className="max-w-2xl mx-auto space-y-4 bg-white/80 backdrop-blur border rounded-xl p-6 shadow-sm">
      <h1 className="text-2xl font-bold">Share your recipe</h1>
      <input value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full border rounded p-2" placeholder="Title" required />
      <div className="grid grid-cols-2 gap-3">
        <input value={cuisine} onChange={(e)=>setCuisine(e.target.value)} className="border rounded p-2" placeholder="Cuisine (optional)" />
        <select value={mealType} onChange={(e)=>setMealType(e.target.value)} className="border rounded p-2">
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
          <option value="dessert">Dessert</option>
          <option value="drink">Drink</option>
          <option value="side">Side</option>
        </select>
        <input value={dietary} onChange={(e)=>setDietary(e.target.value)} className="border rounded p-2" placeholder="Dietary (comma-separated)" />
        <input type="number" min="1" value={servings} onChange={(e)=>setServings(e.target.value)} className="border rounded p-2" placeholder="Servings" />
        <input type="number" min="0" value={time} onChange={(e)=>setTime(e.target.value)} className="border rounded p-2" placeholder="Time (mins)" />
      </div>
      <textarea value={ingredients} onChange={(e)=>setIngredients(e.target.value)} className="w-full border rounded p-2" rows={5} placeholder={"Ingredients (one per line)"} />
      <textarea value={steps} onChange={(e)=>setSteps(e.target.value)} className="w-full border rounded p-2" rows={6} placeholder={"Steps (one per line)"} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-2">
          <input value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)} className="w-full border rounded p-2" placeholder="Image URL (optional)" />
          <Uploader label="Upload Image" accept="image/*" onUploaded={(url)=>setImageUrl(url)} />
          {imageUrl && <img src={imageUrl} alt="preview" className="w-full h-44 object-cover rounded" />}
        </div>
        <div className="space-y-2">
          <input value={videoUrl} onChange={(e)=>setVideoUrl(e.target.value)} className="w-full border rounded p-2" placeholder="YouTube or uploaded video URL (optional)" />
          <Uploader label="Upload Video" accept="video/*" onUploaded={(url)=>setVideoUrl(url)} />
        </div>
      </div>
      <button className="px-4 py-2 rounded bg-gradient-to-r from-indigo-600 to-pink-600 text-white hover:opacity-95">Publish</button>
    </form>
  )
}


