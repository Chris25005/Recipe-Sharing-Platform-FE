import { useRef, useState } from 'react'
import axios from 'axios'

export default function Uploader({ label = 'Upload', accept = 'image/*', onUploaded }) {
  const inputRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onPick = () => inputRef.current?.click()

  const onChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')
    setLoading(true)
    try {
      const form = new FormData()
      form.append('file', file)
      const isImage = file.type.startsWith('image/')
      const { data } = await axios.post(isImage ? '/uploads/image' : '/uploads/video', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      onUploaded?.(data.url)
    } catch (e) {
      setError(e.response?.data?.message || 'Upload failed')
    } finally {
      setLoading(false)
      e.target.value = ''
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <button type="button" onClick={onPick} disabled={loading} className="px-3 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-60">
          {loading ? 'Uploading...' : label}
        </button>
        <input ref={inputRef} type="file" accept={accept} onChange={onChange} className="hidden" />
      </div>
      {error && <div className="text-sm text-red-600">{error}</div>}
    </div>
  )
}



