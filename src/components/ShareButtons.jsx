import { useState } from 'react'

export default function ShareButtons({ title, url }) {
  const [copied, setCopied] = useState(false)
  const shareUrl = encodeURIComponent(url)
  const shareText = encodeURIComponent(title)
  
  function doCopy() {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <div className="flex gap-2 items-center">
      <span className="text-gray-600 font-semibold">Share:</span>
      <a href={`https://facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-blue-600 hover:bg-blue-700 text-white" title="Share on Facebook">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M15.117 8.64V7.13c0-.414.25-.513.427-.513h1.375V3.993L14.01 3.966c-3.088 0-3.799 2.254-3.799 3.7v1.005H7.153A.15.15 0 0 0 7 8.821v2.246c0 .084.067.152.153.152h3.052v5.847c0 .083.068.151.153.151h2.369a.152.152 0 0 0 .153-.151v-5.848h1.444c.072 0 .133-.054.147-.124l.384-2.241a.153.153 0 0 0-.15-.185h-1.82Z"/></svg>
      </a>
      <a href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-sky-500 hover:bg-sky-600 text-white" title="Share on Twitter/X">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.249 6.95c.014.185.014.37.014.556 0 5.645-4.298 12.155-12.154 12.155-2.414 0-4.666-.72-6.553-1.97.343.04.687.067 1.044.067 2.01 0 3.862-.687 5.341-1.841-1.874-.03-3.454-1.272-3.998-2.97a4.235 4.235 0 0 0 1.848-.07c-1.958-.388-3.433-2.122-3.433-4.197v-.054c.584.328 1.262.53 1.98.556a4.248 4.248 0 0 1-1.89-3.538c0-.777.185-1.504.514-2.133 2.009 2.452 5.03 4.063 8.44 4.229-.065-.31-.099-.635-.099-.96 0-2.335 1.898-4.236 4.238-4.236 1.22 0 2.325.516 3.099 1.355a8.312 8.312 0 0 0 2.689-1.028c-.309.96-.96 1.763-1.812 2.273a8.473 8.473 0 0 0 2.417-.665c-.526.826-1.194 1.551-1.963 2.129z"/></svg>
      </a>
      <a href={`https://wa.me/?text=${shareText}%20${shareUrl}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-green-500 hover:bg-green-600 text-white" title="Share on WhatsApp">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.52 3.485A11.873 11.873 0 0 0 12.001 1.2C6.291 1.199 1.2 6.279 1.2 12c0 2.107.555 4.16 1.608 5.97L1.053 23.11a.785.785 0 0 0 .741 1.085c.087 0 .174-.016.258-.047l5.347-1.954c1.702.591 3.486.889 5.302.889h.005c5.71 0 10.802-5.08 10.802-10.799a11.875 11.875 0 0 0-3.686-8.797zM12.007 21.43H12c-1.648 0-3.274-.295-4.817-.876a.779.779 0 0 0-.524-.018l-3.823 1.397 1.362-3.698a.781.781 0 0 0-.09-.693A9.262 9.262 0 0 1 2.761 12c0-5.089 4.146-9.234 9.239-9.234a9.213 9.213 0 0 1 6.537 2.715A9.22 9.22 0 0 1 21.232 12c0 5.092-4.143 9.235-9.225 9.235zm5.361-6.993c-.3-.149-1.766-.872-2.042-.97-.273-.099-.471-.149-.67.151-.196.3-.768.971-.941 1.17-.172.197-.347.223-.646.075-.299-.148-1.262-.466-2.403-1.488-.89-.785-1.491-1.75-1.667-2.05-.173-.298-.018-.457.13-.605.134-.133.299-.347.448-.522.148-.174.197-.298.295-.497.1-.199.05-.373-.025-.521-.075-.148-.666-1.607-.912-2.203-.239-.574-.481-.487-.669-.496l-.571-.01a1.076 1.076 0 0 0-.783.365c-.269.3-1.019.994-1.019 2.421 0 1.426 1.042 2.803 1.188 2.997.145.195 2.05 3.135 5.044 4.282.706.305 1.256.489 1.684.626.706.225 1.351.194 1.86.117.567-.084 1.766-.723 2.012-1.419.248-.7.248-1.3.172-1.422-.08-.124-.273-.2-.573-.348z"/></svg>
      </a>
      <button type="button" onClick={doCopy} className="p-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700" title="Copy link">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 0 1 0 6H9a3 3 0 1 1 0-6m6 0V7a3 3 0 0 0-3-3 3 3 0 0 0-3 3v5m6 0H9"/></svg>
      </button>
      {copied && <span className="text-green-600 text-sm ml-1">Copied!</span>}
    </div>
  )
}
