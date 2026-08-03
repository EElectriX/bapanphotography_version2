import Button from '../common/Button.jsx'

export default function BookingConfirmation({ booking, onReset }) {
  return (
    <div className="animate-fadeUp border border-safelight/40 bg-ink-soft p-8 text-center sm:p-12">
      <p className="eyebrow mb-4">Request Received</p>
      <h3 className="font-display text-2xl text-parchment">
        Thank you, {booking.name.split(' ')[0]}.
      </h3>
      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-parchment-dim">
        Your request for a <span className="text-parchment">{booking.sessionType}</span> around{' '}
        <span className="text-parchment">{booking.date}</span> has been logged. I read every
        inquiry myself and typically reply within two business days with availability and next
        steps.
      </p>
      <div className="mt-8">
        <Button variant="ghost" onClick={onReset}>
          Submit another request
        </Button>
      </div>
    </div>
  )
}
