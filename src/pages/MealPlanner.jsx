import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'

const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
const mealTypes = ['breakfast','lunch','dinner','snack']

export default function MealPlanner() {
  const [recipes, setRecipes] = useState([])
  const [plan, setPlan] = useState([])
  const [title, setTitle] = useState('Weekly Plan')
  const [list, setList] = useState([])

  useEffect(() => {
    axios.get('/recipes?limit=200').then(({ data }) => setRecipes(data))
  }, [])

  const setCell = (dayIdx, mealType, recipeId) => {
    setPlan((prev) => {
      const date = days[dayIdx]
      const filtered = prev.filter((i) => !(i.date === date && i.mealType === mealType))
      if (recipeId) filtered.push({ date, mealType, recipe: recipeId })
      return filtered
    })
  }

  const generateList = async () => {
    const items = plan.map((p) => {
      const r = recipes.find((x) => x._id === p.recipe)
      return { ...p, ingredients: r?.ingredients || [] }
    })
    const { data } = await axios.post('/mealplans/shopping-list', { items })
    setList(data.list)
  }

  const savePlan = async () => {
    const { data } = await axios.post('/mealplans', { title, items: plan })
    alert('Saved plan: ' + data.title)
  }

  const grid = useMemo(() => {
    const map = {}
    for (const item of plan) {
      map[item.date + ':' + item.mealType] = item.recipe
    }
    return map
  }, [plan])

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Meal Planner</h1>
      <input value={title} onChange={(e)=>setTitle(e.target.value)} className="border rounded p-2" placeholder="Plan Title" />
      <div className="overflow-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr>
              <th className="p-2 border">Day</th>
              {mealTypes.map((m) => <th key={m} className="p-2 border capitalize">{m}</th>)}
            </tr>
          </thead>
          <tbody>
            {days.map((d, i) => (
              <tr key={d}>
                <td className="p-2 border font-semibold">{d}</td>
                {mealTypes.map((m) => (
                  <td className="p-2 border" key={m}>
                    <select value={grid[d + ':' + m] || ''} onChange={(e)=>setCell(i, m, e.target.value)} className="w-full border rounded p-1">
                      <option value="">—</option>
                      {recipes.map((r) => <option key={r._id} value={r._id}>{r.title}</option>)}
                    </select>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2">
        <button onClick={savePlan} className="px-4 py-2 rounded bg-indigo-600 text-white">Save Plan</button>
        <button onClick={generateList} className="px-4 py-2 rounded border">Generate Shopping List</button>
      </div>
      {list.length > 0 && (
        <div className="bg-white border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Shopping List</h3>
          <ul className="list-disc ml-6">
            {list.map((i) => <li key={i}>{i}</li>)}
          </ul>
        </div>
      )}
    </div>
  )
}



