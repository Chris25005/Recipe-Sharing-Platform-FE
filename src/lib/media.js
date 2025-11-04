const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const SERVER_BASE = API_BASE.replace(/\/?api\/?$/, '')

export function resolveMediaUrl(url) {
  if (!url) return ''
  if (/^https?:\/\//i.test(url)) return url
  if (url.startsWith('/')) return SERVER_BASE + url
  return SERVER_BASE + '/' + url
}



