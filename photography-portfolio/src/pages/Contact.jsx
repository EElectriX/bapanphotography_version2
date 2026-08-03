import { useState } from 'react'
import { Phone, MapPin, Clock, MessageCircle, ClipboardCopy } from 'lucide-react'
import SectionHeading from '../components/common/SectionHeading.jsx'
import SEO from '../components/SEO.jsx'


import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram, FaSquareYoutube  } from 'react-icons/fa6'

const phoneNumber = '+91 87770 27077'
const whatsappNumber = '+91 70630 86733'
const whatsappHref = `https://wa.me/${whatsappNumber.replace(/[^\d]/g, '')}`

// Replace with your own Apps Script Web App URL
const GOOGLE_SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL

const socialLinks = [
  { label: <FaFacebookF />, name: 'Facebook', href: '#' },
  { label: <FaSquareYoutube />, name: 'Youtube', href: '#' },
  // { label: <FaLinkedinIn />, name: 'LinkedIn', href: '#' },
  { label: <FaInstagram />, name: 'Instagram', href: '#' },
]

// Human-readable labels for every required field, used to build the
// "what's missing" alert message on failed submit.
const REQUIRED_FIELD_LABELS = {
  name: 'Name',
  mobile: 'Mobile Number',
  whatsapp: 'WhatsApp Number',
  message: 'Message',
}

function copyToClipboard(value, message) {
  navigator.clipboard.writeText(value)
  alert(message)
}

function InfoRow({ icon: Icon, title, children }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center border border-ink-line bg-ink">
        <Icon className="h-5 w-5 text-safelight" />
      </div>
      <div className="flex-1">
        <h3 className="font-mono text-[11px] uppercase tracking-widest2 text-parchment-dim">
          {title}
        </h3>
        <div className="mt-1 space-y-0.5 text-[15px] text-parchment">{children}</div>
      </div>
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    whatsapp: '',
    sameAsMobile: true,
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setForm((prev) => {
      const next = { ...prev, [name]: type === 'checkbox' ? checked : value }
      if (name === 'mobile' && prev.sameAsMobile) next.whatsapp = value
      if (name === 'sameAsMobile' && checked) next.whatsapp = prev.mobile
      return next
    })
  }

  // Returns the list of required keys that are currently empty.
  const getMissingKeys = () =>
    Object.keys(REQUIRED_FIELD_LABELS).filter((key) => !form[key] || !form[key].trim())

  const validate = () => {
    const missing = getMissingKeys()
    const nextErrors = {}
    missing.forEach((key) => {
      nextErrors[key] = `${REQUIRED_FIELD_LABELS[key]} is required.`
    })
    setErrors(nextErrors)
    return missing
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const missing = validate()

    if (missing.length > 0) {
      const missingList = missing.map((key) => `• ${REQUIRED_FIELD_LABELS[key]}`).join('\n')
      alert(`Please fill in the following required field(s) before submitting:\n\n${missingList}`)
      return
    }

    setSubmitError('')

    const payload = new URLSearchParams({
      Name: form.name,
      Mobile: form.mobile,
      WhatsApp: form.whatsapp,
      Message: form.message,
    })

    setSending(true)

    fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      // mode: 'no-cors', // can't read the response, but avoids the false failure alert
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: payload.toString(),
    })
      .then((res) => res.text())
      .then((data) => {
        alert(data)
        setSending(false)
        setSent(true)
      })
      .catch((error) => {
        alert('Fetch failed: ' + error)
        setSending(false)
      })
  }

  return (
    

    <>
      <SEO
        title="Contact — Bapan Mondal Photography Academy"
        description="Get in touch with Bapan Mondal for photography courses, workshops, or bookings."
        url="https://www.bapanphotography.in/contact"
      />
    
   
    <div className="container-page py-16 sm:py-24">
      <SectionHeading
        eyebrow="Get in Touch"
        title="Contact"
        description="For bookings, use the booking form — it routes straight to my calendar. For everything else, general questions, press, collaborations, use this one."
      />

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        {/* Contact Information */}
        <div className="border border-ink-line bg-ink-soft p-8">
          <h2 className="font-display text-2xl text-parchment">Contact Information</h2>

          <div className="mt-8 space-y-6">
            <InfoRow icon={Phone} title="Phone">
              <div className="flex items-center gap-2">
                <p className="text-parchment">{phoneNumber}</p>
                <ClipboardCopy
                  className="h-4 w-4 cursor-pointer text-parchment-dim transition-colors hover:text-safelight"
                  onClick={() => copyToClipboard(phoneNumber, 'Phone number copied.')}
                />
              </div>
            </InfoRow>

            <InfoRow icon={MessageCircle} title="WhatsApp">
              <div className="flex items-center gap-2">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="text-parchment hover:text-safelight"
                >
                  {whatsappNumber}
                </a>
                <ClipboardCopy
                  className="h-4 w-4 cursor-pointer text-parchment-dim transition-colors hover:text-safelight"
                  onClick={() => copyToClipboard(whatsappNumber, 'WhatsApp number copied click ok.')}
                />
              </div>
            </InfoRow>

            <InfoRow icon={MapPin} title="Address">
              <p className="text-parchment-dim">Abhaypada School Road</p>
              <p className="text-parchment-dim">Thakurpukur Metro Station</p>
              <p className="text-parchment-dim">Kolkata 700063</p>
            </InfoRow>

            {/* Map */}
            <div className="border border-ink-line">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3687.0826523087144!2d88.30018267599684!3d22.46352813695781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027b714366eed1%3A0xa41a0d3c95a4cf1d!2sBapan%20Mondal%20Photography%20Academy!5e0!3m2!1sen!2sin!4v1756150359369!5m2!1sen!2sin"
                width="100%"
                height="220"
                style={{ border: 0, display: 'block', filter: 'grayscale(80%) contrast(1.1) brightness(0.9)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              />
            </div>

            <InfoRow icon={Clock} title="Business Hours">
              <p className="text-parchment-dim">Monday – Friday: 9:00 AM – 6:00 PM</p>
              <p className="text-parchment-dim">Saturday: 10:00 AM – 4:00 PM</p>
              <p className="text-parchment-dim">Sunday: Closed</p>
            </InfoRow>
          </div>

          {/* Social Media Links */}
          <div className="mt-8 border-t border-ink-line pt-8">
            <h3 className="font-mono text-[11px] uppercase tracking-widest2 text-parchment-dim">
              Follow
            </h3>
            <div className="mt-4 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="flex h-10 w-10 items-center justify-center border border-ink-line font-mono text-xs uppercase text-parchment-dim transition-colors hover:border-safelight hover:text-safelight"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <p className="mt-8 font-mono text-[11px] uppercase tracking-widest2 text-parchment-dim">
            Response time · within two business days
          </p>
        </div>

        {/* Contact Form */}
        <div>
          {sent ? (
            <div className="animate-fadeUp border border-safelight/40 bg-ink-soft p-8">
              <p className="font-display text-xl text-parchment">Message sent.</p>
              <p className="mt-2 text-sm text-parchment-dim">
                Thanks for reaching out — I'll reply within two business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <label htmlFor="name" className="field-label">Name</label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="field-input mt-2"
                  placeholder="Full name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                )}
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="mobile" className="field-label">Mobile Number</label>
                  <input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    value={form.mobile}
                    onChange={handleChange}
                    className="field-input mt-2"
                    placeholder="+91 00000 00000"
                  />
                  {errors.mobile && (
                    <p className="mt-1 text-xs text-red-400">{errors.mobile}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="whatsapp" className="field-label">WhatsApp Number</label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    disabled={form.sameAsMobile}
                    value={form.whatsapp}
                    onChange={handleChange}
                    className="field-input mt-2 disabled:opacity-50"
                    placeholder="+91 00000 00000"
                  />
                  {errors.whatsapp && (
                    <p className="mt-1 text-xs text-red-400">{errors.whatsapp}</p>
                  )}
                </div>
              </div>

              <label htmlFor="sameAsMobile" className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 text-parchment-dim">
                <input
                  id="sameAsMobile"
                  name="sameAsMobile"
                  type="checkbox"
                  checked={form.sameAsMobile}
                  onChange={handleChange}
                  className="h-3.5 w-3.5 accent-safelight"
                />
                WhatsApp number is the same as mobile
              </label>

              <div>
                <label htmlFor="message" className="field-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="field-input mt-2 resize-none"
                  placeholder="What you have in mind, and when."
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-400">{errors.message}</p>
                )}
              </div>

              {submitError && (
                <p className="text-xs text-red-400">{submitError}</p>
              )}

              <button type="submit" className="btn-primary disabled:opacity-60" disabled={sending}>
                {sending ? 'Sending…' : 'Send Message'}
              </button>

              {sending && (
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 text-parchment-dim">
                  <span className="h-3.5 w-3.5 flex-shrink-0 animate-spin rounded-full border-2 border-ink-line border-t-safelight" />
                  <span>Sending your message — waiting for confirmation…</span>
                </div>
              )}

              <p className="text-xxl opacity-40">Wait for 5 sec after submit</p>
            </form>
          )}
        </div>
      </div>
    </div>
     </>
  )
}