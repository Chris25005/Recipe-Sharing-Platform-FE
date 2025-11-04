import { Link } from 'react-router-dom'
import RatingStars from './RatingStars.jsx'
import { resolveMediaUrl } from '../lib/media.js'

export default function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipe/${recipe._id}`} className="bg-white rounded-lg border hover:shadow-sm transition block">
      {recipe.imageUrls?.[0] ? (
        <img src={resolveMediaUrl(recipe.imageUrls[0])} alt={recipe.title} className="w-full h-40 object-cover rounded-t-lg" />
      ) : (
        <div className="w-full h-40 bg-gray-100 rounded-t-lg" />
      )}
      <div className="p-3">
        <div className="font-semibold line-clamp-1">{recipe.title}</div>
        <div className="text-sm text-gray-500 line-clamp-1">{recipe.cuisine}</div>
        <div className="flex items-center gap-2 mt-2">
          <RatingStars value={recipe.averageRating} />
          <span className="text-xs text-gray-500">{recipe.averageRating?.toFixed?.(1) || 0}</span>
        </div>
      </div>
    </Link>
  )
}


