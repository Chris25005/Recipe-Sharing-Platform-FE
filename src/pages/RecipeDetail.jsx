import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../components/AuthContext.jsx'
import VideoEmbed from '../components/VideoEmbed.jsx'
import RatingStars from '../components/RatingStars.jsx'
import { resolveMediaUrl } from '../lib/media.js'
import ShareButtons from '../components/ShareButtons.jsx'

export default function RecipeDetail() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const { user } = useAuth()
  const [fav, setFav] = useState(false)
  const load = async () => {
    const [{ data: r }, { data: c }] = await Promise.all([
      axios.get(`/recipes/${id}`),
      axios.get(`/comments/recipe/${id}`)
    ])
    setRecipe(r)
    setComments(c)
    // fetch favorites if logged in
    if (user) {
      const { data: favs } = await axios.get('/users/me/favorites')
      setFav(favs.some((x) => x._id === r._id))
    } else {
      setFav(false)
    }
  }
  useEffect(() => { load() }, [id])
  const rate = async (value) => {
    const { data } = await axios.post(`/recipes/${id}/rate`, { value })
    setRecipe((prev) => ({ ...prev, averageRating: data.averageRating }))
  }
  const like = async () => {
    const { data } = await axios.post(`/recipes/${id}/like`)
    setRecipe((prev) => ({ ...prev, likesCount: data.likesCount }))
  }
  const submitComment = async (e) => {
    e.preventDefault()
    if (!comment.trim()) return
    await axios.post(`/comments/recipe/${id}`, { content: comment.trim() })
    setComment('')
    load()
  }
  const toggleFavorite = async () => {
    if (!user) return
    if (fav) await axios.delete(`/users/me/favorites/${id}`)
    else await axios.post(`/users/me/favorites/${id}`)
    setFav(!fav)
  }
  if (!recipe) return <div>Loading...</div>

  // Compute canonical URL for sharing
  const canonicalUrl = `${window.location.origin}/recipe/${recipe._id}`

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
        {/* Share Buttons here */}
        <ShareButtons title={recipe.title} url={canonicalUrl} />
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 mt-4">
          <div>By {recipe.author?.name || 'Unknown'}</div>
          <div className="flex items-center gap-2">
            <RatingStars value={recipe.averageRating} />
            <span>{recipe.averageRating?.toFixed?.(1) || 0}</span>
          </div>
          <div>Likes: {recipe.likesCount || 0}</div>
        </div>
        {recipe.imageUrls?.[0] && (
          <img src={resolveMediaUrl(recipe.imageUrls[0])} alt={recipe.title} className="w-full h-64 object-cover rounded-lg mb-4" />
        )}
        <VideoEmbed url={recipe.videoUrl} />
        <h2 className="text-xl font-semibold mt-6 mb-2">Ingredients</h2>
        <ul className="list-disc ml-6">
          {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">Steps</h2>
        <ol className="list-decimal ml-6 space-y-2">
          {recipe.steps.map((st, i) => <li key={i}>{st}</li>)}
        </ol>
      </div>
      <aside>
        <div className="bg-white border rounded-lg p-4 space-y-3">
          {user && (
            <>
              <div className="flex items-center gap-2">
                {[1,2,3,4,5].map((v) => (
                  <button key={v} onClick={() => rate(v)} className="px-2 py-1 border rounded">{v}</button>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={like} className="px-3 py-2 rounded bg-pink-600 text-white">Like</button>
                <button onClick={toggleFavorite} className={`px-3 py-2 rounded ${fav ? 'bg-yellow-500 text-white' : 'border'}`}>{fav ? 'Favorited' : 'Add to Favorites'}</button>
              </div>
              <form onSubmit={submitComment} className="space-y-2">
                <textarea value={comment} onChange={(e)=>setComment(e.target.value)} className="w-full border rounded p-2" rows={3} placeholder="Leave a comment" />
                <button className="px-3 py-2 rounded bg-gray-800 text-white">Post</button>
              </form>
            </>
          )}
          <div>
            <h3 className="font-semibold mb-2">Comments</h3>
            <div className="space-y-3">
              {comments.map((c) => (
                <div key={c._id} className="border rounded p-2">
                  <div className="text-sm text-gray-600">{c.author?.name}</div>
                  <div>{c.content}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}


