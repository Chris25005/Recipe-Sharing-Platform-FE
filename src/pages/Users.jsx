import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../components/AuthContext.jsx'

export default function Users() {
  const [users, setUsers] = useState([])
  const [query, setQuery] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const { user: me } = useAuth()

  useEffect(() => {
    const timeout = setTimeout(() => setSearch(query), 300)
    return () => clearTimeout(timeout)
  }, [query])

  useEffect(() => {
    setLoading(true)
    axios.get('/users', { params: { q: search } })
      .then(({ data }) => setUsers(data))
      .finally(() => setLoading(false))
  }, [search])

  const follow = async (id) => {
    await axios.post(`/users/${id}/follow`)
    setUsers(users.map((u) =>
      u._id === id ? { ...u, followersCount: (u.followersCount || 0) + 1 } : u
    ))
  }
  const unfollow = async (id) => {
    await axios.post(`/users/${id}/unfollow`)
    setUsers(users.map((u) =>
      u._id === id ? { ...u, followersCount: Math.max((u.followersCount || 1) - 1, 0) } : u
    ))
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Discover Users</h1>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border rounded p-2 mb-4 w-full max-w-md"
        placeholder="Search users by name or email..."
      />
      {loading ? <div>Loading...</div> : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div key={user._id} className="flex items-center bg-white border rounded-lg p-3 gap-4 shadow-sm">
              <img src={user.avatarUrl || 'https://placehold.co/64x64'} alt="avatar" className="w-14 h-14 rounded-full object-cover" />
              <div className="flex-1">
                <div className="text-lg font-semibold">{user.name}</div>
                <div className="text-gray-500 text-sm">Followers: {user.followersCount || 0}</div>
              </div>
              {me && me.id !== user._id && (
                <>
                  <button
                    className="px-3 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 mr-2"
                    onClick={() => follow(user._id)}
                  >Follow</button>
                  <button
                    className="px-3 py-2 rounded border hover:bg-gray-100"
                    onClick={() => unfollow(user._id)}
                  >Unfollow</button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
