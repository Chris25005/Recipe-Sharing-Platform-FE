import { resolveMediaUrl } from '../lib/media.js'

export default function VideoEmbed({ url }) {
  if (!url) return null
  const yt = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]+)/.exec(url)
  const id = yt ? yt[1] : null
  if (id) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-lg border">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${id}`}
          title="Video tutorial"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }
  // Fallback: render uploaded video file
  const src = resolveMediaUrl(url)
  return (
    <video className="w-full rounded-lg border" src={src} controls preload="metadata" />
  )
}


