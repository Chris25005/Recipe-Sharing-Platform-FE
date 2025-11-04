import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import RecipeCard from '../components/RecipeCard.jsx'
import Uploader from '../components/Uploader.jsx'
import { useAuth } from '../components/AuthContext.jsx'

export default function Profile() {
  const { id } = useParams()
  const { user: me, setUser: setAuthUser } = useAuth()
  const [user, setProfileUser] = useState(null)
  const [recipes, setRecipes] = useState([])
  const [edit, setEdit] = useState(false)
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [avatar, setAvatar] = useState('')
  const [following, setFollowing] = useState([])
  const [followers, setFollowers] = useState([])
  useEffect(() => { load() }, [id])
  const load = async () => {
    const { data } = await axios.get(`/users/${id}`)
    setProfileUser(data)
    const { data: all } = await axios.get('/recipes?limit=100')
    setRecipes(all.filter((r) => r.author?._id === id))
    setName(data.name || '')
    setBio(data.bio || '')
    setAvatar(data.avatarUrl || '')
    // fetch followers/following
    const [{ data: followingData }, { data: followersData }] = await Promise.all([
      axios.get(`/users/${id}/following`).catch(() => []),
      axios.get(`/users/${id}/followers`).catch(() => [])
    ])
    setFollowing(followingData)
    setFollowers(followersData)
  }
  const follow = async () => {
    await axios.post(`/users/${id}/follow`)
    load()
  }
  const unfollow = async () => {
    await axios.post(`/users/${id}/unfollow`)
    load()
  }
  const save = async () => {
    const { data } = await axios.put('/users/me', { name, bio, avatarUrl: avatar })
    if (me && me.id === id) setAuthUser({ ...me, name: data.name, avatarUrl: data.avatarUrl })
    setEdit(false)
    load()
  }
  return (
    <div className="space-y-4">
      <div className="bg-white border rounded-lg p-4 flex items-center gap-4">
        <img src={user?.avatarUrl || 'https://placehold.co/80x80'} alt="avatar" className="w-20 h-20 rounded-full object-cover" />
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{user?.name}</h1>
          <div className="text-sm text-gray-600">{user?.bio}</div>
          <div className="text-sm text-gray-600">Followers: {user?.followersCount} · Following: {user?.followingCount}</div>
        </div>
        {me && me.id !== user?._id && (
          <div className="flex gap-2">
            <button onClick={follow} className="px-3 py-2 rounded bg-indigo-600 text-white">Follow</button>
            <button onClick={unfollow} className="px-3 py-2 rounded border">Unfollow</button>
          </div>
        )}
        {me && me.id === user?._id && (
          <button onClick={()=>setEdit(true)} className="px-3 py-2 rounded border">Edit Profile</button>
        )}
      </div>
      {edit && (
        <div className="bg-white border rounded-lg p-4 space-y-3">
          <h3 className="font-semibold">Edit Profile</h3>
          <input value={name} onChange={(e)=>setName(e.target.value)} className="border rounded p-2 w-full" placeholder="Name" />
          <textarea value={bio} onChange={(e)=>setBio(e.target.value)} className="border rounded p-2 w-full" rows={3} placeholder="Bio" />
          <div className="grid md:grid-cols-2 gap-3">
            <input value={avatar} onChange={(e)=>setAvatar(e.target.value)} className="border rounded p-2" placeholder="Avatar URL" />
            <Uploader label="Upload Avatar" accept="image/*" onUploaded={(url)=>setAvatar(url)} />
          </div>
          <div className="flex gap-2">
            <button onClick={save} className="px-3 py-2 rounded bg-indigo-600 text-white">Save</button>
            <button onClick={()=>setEdit(false)} className="px-3 py-2 rounded border">Cancel</button>
          </div>
        </div>
      )}
      <div>
        <h2 className="text-xl font-semibold mb-2">Recipes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recipes.map((r) => <RecipeCard key={r._id} recipe={r} />)}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div>
          <h2 className="text-lg font-semibold mb-2">Following</h2>
          <div className="space-y-2">
            {following.map((u) => (
              <div key={u._id} className="flex items-center gap-3 p-2 bg-gray-50 border rounded">
                <img src={u.avatarUrl || 'https://placehold.co/40x40'} className="w-10 h-10 rounded-full object-cover" />
                <span className="font-medium">{u.name}</span>
                {me && me.id !== u._id && (
                  <>
                    <button className="px-2 py-1 text-xs rounded bg-indigo-600 text-white" onClick={()=>axios.post(`/users/${u._id}/follow`).then(load)}>Follow</button>
                    <button className="px-2 py-1 text-xs rounded border" onClick={()=>axios.post(`/users/${u._id}/unfollow`).then(load)}>Unfollow</button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Followers</h2>
          <div className="space-y-2">
            {followers.map((u) => (
              <div key={u._id} className="flex items-center gap-3 p-2 bg-gray-50 border rounded">
                <img src={u.avatarUrl || 'https://placehold.co/40x40'} className="w-10 h-10 rounded-full object-cover" />
                <span className="font-medium">{u.name}</span>
                {me && me.id !== u._id && (
                  <>
                    <button className="px-2 py-1 text-xs rounded bg-indigo-600 text-white" onClick={()=>axios.post(`/users/${u._id}/follow`).then(load)}>Follow</button>
                    <button className="px-2 py-1 text-xs rounded border" onClick={()=>axios.post(`/users/${u._id}/unfollow`).then(load)}>Unfollow</button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


