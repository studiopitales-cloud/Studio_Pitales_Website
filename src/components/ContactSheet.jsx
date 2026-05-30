import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'

const SPRING = { type: 'spring', damping: 30, stiffness: 280 }
const EASE   = { duration: 0.38, ease: [0.16, 1, 0.3, 1] }

function InputField({ type = 'text', placeholder, value, onChange, onBlur, required, error }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        dir="rtl"
        inputMode={type === 'tel' ? 'numeric' : undefined}
        style={{
          height: 56,
          padding: '0 20px',
          fontSize: 16,
          fontFamily: 'inherit',
          borderRadius: 16,
          border: `1.5px solid ${error ? '#e05252' : focused ? '#92a6b4' : 'rgba(26,26,26,0.11)'}`,
          boxShadow: error
            ? '0 0 0 3.5px rgba(224,82,82,0.13)'
            : focused
              ? '0 0 0 3.5px rgba(146,166,180,0.18)'
              : '0 2px 10px rgba(0,0,0,0.04)',
          background: 'rgba(255,255,255,0.68)',
          color: '#1a1a1a',
          width: '100%',
          outline: 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => { setFocused(false); onBlur?.() }}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            style={{ fontSize: 12.5, color: '#e05252', marginTop: 5, paddingRight: 4 }}
            dir="rtl"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function Spinner() {
  return (
    <motion.div
      style={{
        width: 22, height: 22, borderRadius: '50%',
        border: '2.5px solid rgba(26,26,26,0.2)',
        borderTopColor: '#1a1a1a',
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.75, repeat: Infinity, ease: 'linear' }}
    />
  )
}

const PHONE_RE = /^05\d{8}$/

function FormContent({ onClose }) {
  const [step, setStep] = useState('idle') // 'idle' | 'loading' | 'success'
  const [name, setName]   = useState('')
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [nameError, setNameError]   = useState('')

  const validatePhone = (val) => {
    if (!val) { setPhoneError(''); return false }
    if (!PHONE_RE.test(val)) { setPhoneError('מספר טלפון לא תקין'); return false }
    setPhoneError('')
    return true
  }

  const validateName = (val) => {
    if (!val.trim()) { setNameError('שדה חובה'); return false }
    setNameError('')
    return true
  }

  const phoneValid = PHONE_RE.test(phone)

  const submit = async e => {
    e.preventDefault()
    const nameOk  = validateName(name)
    const phoneOk = validatePhone(phone)
    if (!nameOk || !phoneOk) return
    setStep('loading')
    try {
      const res = await fetch('/api/create-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim(), hp: '' }),
      })
    } catch (err) {
      console.error('[BoostApp] fetch error:', err)
    }
    setStep('success')
    setTimeout(onClose, 3600)
  }

  return (
    <div className="relative">
      {/* Form — always rendered to hold size, hidden after submit */}
      <div style={{ visibility: step === 'success' ? 'hidden' : 'visible' }}>
        {/* Title */}
        <div className="mb-7" dir="rtl">
          <h2
            className="font-bold text-[#1a1a1a] mb-2"
            style={{ fontSize: 'clamp(22px, 5vw, 27px)', letterSpacing: '-0.022em', lineHeight: 1.25 }}
          >
            לתיאום שיעור היכרות
          </h2>
          <p
            className="font-normal text-[#1a1a1a]"
            style={{ fontSize: 15, lineHeight: 1.65, opacity: 0.52 }}
          >
            נחזור אלייך בהקדם עם כל הפרטים על הסטודיו :)
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="flex flex-col gap-3">
          {/* Honeypot — hidden from real users, catches bots */}
          <input name="hp" type="text" autoComplete="off" tabIndex={-1} style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }} />
          <InputField
            placeholder="שם מלא"
            value={name}
            onChange={e => { setName(e.target.value); if (nameError) validateName(e.target.value) }}
            onBlur={() => validateName(name)}
            required
            error={nameError}
          />
          <InputField
            type="tel"
            placeholder="טלפון"
            value={phone}
            onChange={e => { const v = e.target.value.replace(/\D/g, ''); setPhone(v); if (phoneError) validatePhone(v) }}
            onBlur={() => validatePhone(phone)}
            required
            error={phoneError}
          />

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={step === 'loading'}
            className="w-full font-medium text-[#1a1a1a] flex items-center justify-center"
            style={{
              height: 56,
              marginTop: 6,
              borderRadius: 16,
              backgroundColor: '#92a6b4',
              fontSize: 17,
              fontFamily: 'inherit',
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '-0.01em',
            }}
            whileHover={{ opacity: 0.86 }}
            whileTap={{ scale: 0.985 }}
            transition={{ duration: 0.15 }}
          >
            {step === 'loading' ? <Spinner /> : 'שלחי פרטים'}
          </motion.button>

          {/* Microcopy */}
          <p
            className="text-center font-normal text-[#1a1a1a]"
            style={{ fontSize: 12.5, opacity: 0.38, marginTop: 2, letterSpacing: '0.01em' }}
            dir="rtl"
          >
            ללא התחייבות · יחס אישי · התאמה מלאה לרמה שלך
          </p>
        </form>
      </div>

      {/* Success overlay — absolute so popup size doesn't change */}
      <AnimatePresence>
        {step === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center"
            dir="rtl"
          >
            <p className="text-[21px] font-bold text-[#1a1a1a]">הפרטים התקבלו בהצלחה ✨</p>
            <p className="text-[20px] font-normal text-[#1a1a1a] mt-1">ניצור איתך קשר בהקדם!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ContactSheet() {
  const [open, setOpen]       = useState(false)
  const [isMobile, setMobile] = useState(true)
  const dragControls          = useDragControls()

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const handler = () => setOpen(true)
    document.addEventListener('openContactSheet', handler)
    return () => document.removeEventListener('openContactSheet', handler)
  }, [])

  const close = () => setOpen(false)

  /* Lock scroll */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const sheetContent = (
    <div className="px-6 md:px-9 pb-9 pt-2 md:pt-7">
      <FormContent key={open ? 'open' : 'closed'} onClose={close} />
    </div>
  )

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            className="fixed inset-0 z-[300]"
            style={{ background: 'rgba(15,12,9,0.42)', backdropFilter: 'blur(7px)', WebkitBackdropFilter: 'blur(7px)' }}
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0 }}
            onClick={close}
          />

          {/* ── Mobile bottom sheet ── */}
          {isMobile && (
            <motion.div
              className="fixed bottom-0 inset-x-0 z-[301] bg-[#f0ece4] overflow-hidden"
              style={{ borderRadius: '28px 28px 0 0' }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={SPRING}
              drag="y"
              dragControls={dragControls}
              dragConstraints={{ top: 0 }}
              dragElastic={{ top: 0, bottom: 0.45 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 90 || info.velocity.y > 420) close()
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Drag handle */}
              <div
                className="flex justify-center pt-4 pb-1 cursor-grab active:cursor-grabbing"
                onPointerDown={e => dragControls.start(e)}
              >
                <div style={{ width: 40, height: 5, borderRadius: 99, background: 'rgba(26,26,26,0.14)' }} />
              </div>
              {sheetContent}
            </motion.div>
          )}

          {/* ── Desktop centered modal ── */}
          {!isMobile && (
            <div
              className="fixed inset-0 z-[301] flex items-center justify-center pointer-events-none"
              onClick={e => e.stopPropagation()}
            >
              <motion.div
                className="bg-[#f0ece4] overflow-hidden pointer-events-auto relative"
                style={{ width: 480, borderRadius: 24, boxShadow: '0 32px 80px rgba(0,0,0,0.18)' }}
                initial={false}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0 }}
              >
                {/* Close button */}
                <button
                  onClick={close}
                  className="absolute top-5 left-5 flex items-center justify-center text-[#1a1a1a]"
                  style={{ width: 32, height: 32, borderRadius: 99, background: 'rgba(26,26,26,0.07)', border: '1.5px solid transparent', cursor: 'pointer', fontSize: 16, zIndex: 10, transition: 'border-color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#1a1a1a'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
                  aria-label="סגור"
                >
                  ×
                </button>
                <div style={{ position: 'relative' }}>
                  {sheetContent}
                </div>
              </motion.div>
            </div>
          )}
        </>
      )}
    </AnimatePresence>
  )
}
