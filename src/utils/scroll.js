export const NAVBAR_H = 92

let _progScroll = false
export const isProgScroll = () => _progScroll

export function smoothScrollTo(id) {
  const el = document.querySelector(id)
  if (!el) return
  _progScroll = true
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - NAVBAR_H, behavior: 'smooth' })
  setTimeout(() => { _progScroll = false }, 1400)
}
