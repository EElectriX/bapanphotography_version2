import { useState } from 'react'
import SectionHeading from '../components/common/SectionHeading.jsx'
import BookingForm from '../components/booking/BookingForm.jsx'
import BookingConfirmation from '../components/booking/BookingConfirmation.jsx'
import SEO from '../components/SEO.jsx'

export default function Booking() {
  const [confirmedBooking, setConfirmedBooking] = useState(null)

  return (
    


    <>
      <SEO
        title="Book a Session — Bapan Mondal Photography"
        description="Book photography sessions, courses, or workshops with Bapan Mondal."
        url="https://www.bapanphotography.in/booking"
      />
    <div className="container-page py-16 sm:py-24">
      <SectionHeading
        eyebrow="Availability"
        title="Book a Session"
        description="Share a few details about the shoot and I'll follow up personally with availability, pricing, and next steps."
      />

      <div className="mt-14 max-w-2xl">
        {confirmedBooking ? (
          <BookingConfirmation
            booking={confirmedBooking}
            onReset={() => setConfirmedBooking(null)}
          />
        ) : (
          <BookingForm onSuccess={setConfirmedBooking} />
        )}
      </div>
    </div>
      </>
  )
}
