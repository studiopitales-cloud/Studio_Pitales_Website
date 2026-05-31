import { useRef, useState, useEffect } from 'react'

export default function LazySection({ children, rootMargin = '300px' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect() } },
      { rootMargin }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return <div ref={ref}>{visible ? children : null}</div>
}
