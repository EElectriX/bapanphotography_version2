import { useState, useMemo } from "react";

/**
 * BAPAN MONDAL PHOTOGRAPHY ACADEMY (BMPA) — Admission Form
 * Recreated from the source Google Form.
 *
 * Design direction: a "contact sheet" — the strip of thumbnails a
 * photographer marks up before printing. Film sprocket holes run down
 * both edges, each question is a numbered frame, and an aperture-blade
 * mark up top doubles as a live progress ring for the required fields.
 */

const COURSE_OPTIONS = [
  "Photography Professional Master Class",
  "Video Editing Advance Class",
  "Both",
];

const INTEREST_OPTIONS = ["Photography", "Cinematography", "Editing", "All"];

const REASON_OPTIONS = [
  "For Developing Skill",
  "For Fun",
  "To be a Professional Photographer",
  "For Own Passion",
  "To be a Professional Editor",
  "All",
];

const QR_IMG = "/images/QR/qr.jpg";

const FEE_STRUCTURES = [
  {
    title: "Photography Master Class",
    total: "₹11,999",
    oneTimePrice: "₹11,400",
    rows: [
      ["Seat Booking Amount", "₹999", "Pay at the time of registration to confirm your seat"],
      ["First Class Payment", "₹6,000", "Payable on the first day of the class"],
      ["Second Installment", "₹3,000", "Payable in the following month"],
      ["Final Installment", "₹2,000", "Payable in the next month"],
    ],
  },
  {
    title: "Advanced Video Editing Course",
    total: "₹9,999",
    oneTimePrice: "₹9,499",
    rows: [
      ["Seat Booking Amount", "₹999", "Pay at the time of registration to confirm your seat"],
      ["First Class Payment", "₹5,000", "Payable on the first day of the class"],
      ["Second Installment", "₹2,000", "Payable in the following month"],
      ["Final Installment", "₹2,000", "Payable in the next month"],
    ],
  },
  {
    title: "Both Courses (Photography + Video Editing)",
    total: "₹19,999",
    oneTimePrice: "₹18,999",
    rows: [
      ["Seat Booking Amount", "₹999", "Pay at the time of registration to confirm your seat"],
      ["First Class Day Payment", "₹11,000", "Payable on the first day of the class"],
      ["Second Installment", "₹5,000", "Payable in the following month"],
      ["Final Installment", "₹3,000", "Payable in the next month"],
    ],
  },
];

const initialForm = {
  course: "",
  name: "",
  mobile: "",
  whatsapp: "",
  district: "",
  interest: "",
  address: "",
  reasons: [],
  date: "",
};

// Frame numbers + human labels for every required field, used to build the
// "which frame is missing" alert message on failed submit.
const REQUIRED_FIELD_INFO = {
  course: { frame: 1, label: "Course" },
  name: { frame: 2, label: "What is your Name?" },
  mobile: { frame: 3, label: "What is your Mobile Number?" },
  whatsapp: { frame: 4, label: "What is your WhatsApp Number?" },
  district: { frame: 5, label: "What is your District?" },
  interest: { frame: 6, label: "Mostly Interested in?" },
};

function AperturePin({ progress }) {
  // progress: 0..1 — blades rotate closed as the roll (form) fills up.
  const blades = 6;
  const closeAngle = progress * 34; // how far each blade rotates inward
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden="true">
      <circle cx="36" cy="36" r="34" fill="none" stroke="#4a4335" strokeWidth="1" />
      {Array.from({ length: blades }).map((_, i) => {
        const rot = (360 / blades) * i;
        return (
          <path
            key={i}
            d="M36 36 L36 4 A32 32 0 0 1 63.7 20 Z"
            fill="#c9a15a"
            opacity="0.85"
            transform={`rotate(${rot + closeAngle} 36 36)`}
            style={{ transformOrigin: "36px 36px", transition: "transform 0.5s ease" }}
          />
        );
      })}
      <circle cx="36" cy="36" r={10 - progress * 6} fill="#15130f" style={{ transition: "r 0.5s ease" }} />
    </svg>
  );
}

function Sprockets({ side }) {
  return (
    <div className={`sprockets sprockets-${side}`} aria-hidden="true">
      {Array.from({ length: 26 }).map((_, i) => (
        <span key={i} className="sprocket-hole" />
      ))}
    </div>
  );
}

function Frame({ number, label, required, hint, children }) {
  return (
    <div className="frame">
      <div className="frame-eyebrow">
        <span className="frame-number">FRAME {String(number).padStart(2, "0")}</span>
        <span className="frame-rule" />
      </div>
      <label className="frame-label">
        {label} {required && <span className="req-dot" title="Required">●</span>}
      </label>
      {hint && <p className="frame-hint">{hint}</p>}
      {children}
    </div>
  );
}

function RadioGroup({ name, options, value, onChange }) {
  return (
    <div className="option-stack">
      {options.map((opt) => (
        <label key={opt} className={`option-row ${value === opt ? "option-row--checked" : ""}`}>
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={(e) => onChange(e.target.value)}
          />
          <span className="option-mark" />
          <span>{opt}</span>
        </label>
      ))}
    </div>
  );
}

function CheckboxGroup({ options, values, onToggle }) {
  return (
    <div className="option-stack">
      {options.map((opt) => (
        <label key={opt} className={`option-row ${values.includes(opt) ? "option-row--checked" : ""}`}>
          <input
            type="checkbox"
            checked={values.includes(opt)}
            onChange={() => onToggle(opt)}
          />
          <span className="option-mark option-mark--square" />
          <span>{opt}</span>
        </label>
      ))}
    </div>
  );
}

function FeeStructureSection({ onZoomQr }) {
  return (
    <div className="fee-structure">
      <div className="frame-eyebrow">
        <span className="frame-number">CONTACT SHEET</span>
        <span className="frame-rule" />
      </div>
      <h2 className="fee-structure-title">Course &amp; Fee Structure</h2>
     <h2 className="w-full rounded-lg px-4 py-3 text-center text-lg font-bold text-white bg-[length:400%_400%] bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 to-red-500 animate-gradient">
        One-time payment 5% off &amp; EMI payment 5% extra
      </h2>
      <p className="frame-hint">
        Please review the course fees below before filling out the admission form.
      </p>

      <div className="fee-grid">
        {FEE_STRUCTURES.map((course) => (
          <div className="fee-panel" key={course.title}>
            <h4>{course.title} · Total {course.total}</h4>

            {course.oneTimePrice && (
              <div className="one-time-badge">
                <span className="one-time-badge__tag">5% OFF · ONE-TIME</span>
                <div className="one-time-badge__prices">
                  <span className="one-time-badge__strike">{course.total}</span>
                  <span className="one-time-badge__price">{course.oneTimePrice}</span>
                </div>
                <span className="one-time-badge__note">Pay the full course fee in one shot &amp; save</span>
              </div>
            )}

            <ul>
              {course.rows.map(([label, amount, note]) => (
                <li key={label}>
                  <strong>{label}:</strong> {amount}
                  {note ? ` — ${note}` : ""}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="payment-box">
        <button
          type="button"
          className="qr-thumb-btn"
          onClick={onZoomQr}
          aria-label="Zoom in on payment QR code"
        >
          <img src={QR_IMG} alt="Payment QR code" />
          <span className="qr-thumb-hint">Tap to zoom</span>
        </button>
        <div className="details">
          <p>Do the payment of Seat Booking Amount ₹999 &amp; provide the screenshot on the</p>
          <p>Official WhatsApp Number: <strong>7063086733</strong></p>
          <p>PhonePe / GPay: <strong>7872927077</strong></p>
          <p>Scan the QR for payment.</p>
        </div>
      </div>
    </div>
  );
}

function QrZoomModal({ onClose }) {
  return (
    <div className="qr-modal-backdrop" onClick={onClose}>
      <div className="qr-modal-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="qr-modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <img src={QR_IMG} alt="Payment QR code, zoomed in" className="qr-modal-img" />
        <p className="qr-modal-caption">
          PhonePe / GPay — <strong>7872927077</strong>
        </p>
      </div>
    </div>
  );
}

export default function BMPAAdmissionForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [qrZoomed, setQrZoomed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  const toggleReason = (opt) =>
    setForm((f) => ({
      ...f,
      reasons: f.reasons.includes(opt)
        ? f.reasons.filter((r) => r !== opt)
        : [...f.reasons, opt],
    }));

  const requiredKeys = useMemo(
    () => ["course", "name", "mobile", "whatsapp", "district", "interest"],
    []
  );

  const filledCount = requiredKeys.filter((k) => form[k] && form[k].trim?.() !== "").length;
  const progress = requiredKeys.length ? filledCount / requiredKeys.length : 0;

  // Returns the list of required keys that are currently empty.
  const getMissingKeys = () =>
    requiredKeys.filter((k) => !form[k] || !form[k].trim?.());

  const validate = () => {
    const missing = getMissingKeys();
    const next = {};
    missing.forEach((key) => {
      const info = REQUIRED_FIELD_INFO[key];
      next[key] = `Please fill in Frame ${String(info.frame).padStart(2, "0")} — ${info.label}.`;
    });
    setErrors(next);
    return missing;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const missing = validate();

    if (missing.length > 0) {
      const missingList = missing
        .map((key) => {
          const info = REQUIRED_FIELD_INFO[key];
          return `Frame ${String(info.frame).padStart(2, "0")} — ${info.label}`;
        })
        .join("\n");
      alert(`Please fill in the following required frame(s) before submitting:\n\n${missingList}`);
      return;
    }

    const url = import.meta.env.VITE_BMPA_ADMISSION_URL;

    const payload = new URLSearchParams({
      Course: form.course,
      Name: form.name,
      Mobile: form.mobile,
      WhatsApp: form.whatsapp,
      District: form.district,
      Interest: form.interest,
      Address: form.address,
      Reasons: form.reasons.join(", "), // array → comma-separated string
      Date: form.date,
    });

    setIsSubmitting(true);

    fetch(url, {
      method: "POST",
      // mode: "no-cors", // can't read the response, but avoids the false failure alert
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: payload.toString(),
    })
      .then((res) => res.text())
      .then((data) => {
        alert(data);
        setIsSubmitting(false);
        setSubmitted(true);
      })
      .catch((error) => {
        alert("Fetch failed: " + error);
        setIsSubmitting(false);
      });
  };

  const handleClear = () => {
    setForm(initialForm);
    setErrors({});
    setSubmitted(false);
    setIsSubmitting(false);
  };

  return (
    <div className="roll">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,500&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .roll {
          --void: #15130f;
          --card: #211d17;
          --paper: #f2ead9;
          --paper-dim: #cfc6b2;
          --brass: #c9a15a;
          --shutter: #d94f30;
          --line: #4a4335;
          min-height: 100%;
          background: var(--void);
          background-image:
            radial-gradient(ellipse at top, rgba(201,161,90,0.08), transparent 55%);
          color: var(--paper);
          font-family: 'IBM Plex Sans', sans-serif;
          padding: 48px 16px;
          display: flex;
          justify-content: center;
        }
        .roll * { box-sizing: border-box; }

        .sheet {
          width: 100%;
          max-width: 640px;
          background: var(--card);
          border: 1px solid var(--line);
          position: relative;
          padding: 0 34px;
        }

        .sprockets {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 14px 0;
        }
        .sprockets-left { left: 0; align-items: flex-start; padding-left: 6px; }
        .sprockets-right { right: 0; align-items: flex-end; padding-right: 6px; }
        .sprocket-hole {
          width: 8px;
          height: 8px;
          border-radius: 2px;
          background: var(--void);
          border: 1px solid var(--line);
        }

        .header {
          padding: 40px 0 24px;
          border-bottom: 1px solid var(--line);
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .header-text .eyebrow {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          color: var(--brass);
          margin: 0 0 6px;
        }
        .header-text h1 {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 28px;
          line-height: 1.15;
          margin: 0 0 6px;
          color: var(--paper);
        }
        .header-text p {
          font-family: 'Fraunces', serif;
          font-style: italic;
          font-size: 16px;
          color: var(--paper-dim);
          margin: 0;
        }
        .roll-counter {
          margin-left: auto;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          color: var(--paper-dim);
          text-align: right;
          white-space: nowrap;
        }
        .roll-counter strong { color: var(--brass); display: block; font-size: 15px; }

        .fee-structure {
          padding: 26px 0 6px;
          border-bottom: 1px solid var(--line);
        }
        .fee-structure-title {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 20px;
          margin: 4px 0 6px;
          color: var(--paper);
        }
        .fee-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
          margin-top: 10px;
        }

        .form-body { padding: 30px 0 12px; }

        .frame { padding: 22px 0; border-bottom: 1px solid var(--line); }
        .frame:last-of-type { border-bottom: none; }
        .frame-eyebrow { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        .frame-number {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          color: var(--brass);
        }
        .frame-rule { flex: 1; height: 1px; background: var(--line); }
        .frame-label { font-size: 16px; font-weight: 500; color: var(--paper); display: block; margin-bottom: 4px; }
        .frame-hint { font-size: 13px; color: var(--paper-dim); margin: 0 0 10px; }
        .req-dot { color: var(--shutter); font-size: 9px; vertical-align: super; }

        input[type="text"], input[type="tel"], input[type="date"] {
          width: 100%;
          background: var(--void);
          border: 1px solid var(--line);
          color: var(--paper);
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 14px;
          padding: 12px 14px;
          border-radius: 2px;
          outline: none;
          transition: border-color 0.2s ease;
        }
        input[type="text"]:focus, input[type="tel"]:focus, input[type="date"]:focus {
          border-color: var(--brass);
        }
        input::placeholder { color: #6b6455; }

        .option-stack { display: flex; flex-direction: column; gap: 8px; margin-top: 4px; }
        .option-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: var(--paper-dim);
          cursor: pointer;
          padding: 4px 0;
        }
        .option-row--checked { color: var(--paper); }
        .option-row input { position: absolute; opacity: 0; width: 0; height: 0; }
        .option-mark {
          width: 16px; height: 16px; flex: 0 0 16px;
          border: 1px solid var(--line);
          border-radius: 50%;
          position: relative;
        }
        .option-mark--square { border-radius: 3px; }
        .option-row--checked .option-mark { border-color: var(--brass); }
        .option-row--checked .option-mark::after {
          content: "";
          position: absolute; inset: 3px;
          background: var(--brass);
          border-radius: 50%;
        }
        .option-row--checked .option-mark--square::after { border-radius: 1px; }

        .error-text { color: var(--shutter); font-size: 12px; margin-top: 6px; }

        .fee-panel {
          background: var(--void);
          border: 1px dashed var(--line);
          padding: 16px 18px;
          font-size: 13px;
          color: var(--paper-dim);
        }
        .fee-panel h4 {
          font-family: 'Fraunces', serif;
          font-style: italic;
          color: var(--brass);
          font-size: 15px;
          margin: 0 0 10px;
        }
        .fee-panel ul { margin: 0; padding-left: 18px; }
        .fee-panel li { margin-bottom: 4px; }

        .one-time-badge {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin: 0 0 14px;
          padding: 10px 14px;
          border-radius: 4px;
          background: linear-gradient(120deg, #2a1608, #3a1c0a 45%, #2a1608);
          border: 1px solid var(--shutter);
          box-shadow: 0 0 0 1px rgba(217,79,48,0.15), 0 4px 14px rgba(217,79,48,0.18);
          overflow: hidden;
        }
        .one-time-badge::before {
          content: "";
          position: absolute;
          top: 0; left: -60%;
          width: 40%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.16), transparent);
          transform: skewX(-20deg);
          animation: badgeShine 3.2s ease-in-out infinite;
        }
        @keyframes badgeShine {
          0% { left: -60%; }
          55% { left: 130%; }
          100% { left: 130%; }
        }
        .one-time-badge__tag {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: var(--void);
          background: var(--brass);
          padding: 4px 8px;
          border-radius: 3px;
          white-space: nowrap;
          z-index: 1;
        }
        .one-time-badge__prices {
          display: flex;
          align-items: baseline;
          gap: 8px;
          z-index: 1;
        }
        .one-time-badge__strike {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          color: var(--paper-dim);
          text-decoration: line-through;
          opacity: 0.7;
        }
        .one-time-badge__price {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 19px;
          color: #ffb37a;
        }
        .one-time-badge__note {
          font-size: 11px;
          color: var(--paper-dim);
          z-index: 1;
          margin-left: auto;
        }

        .payment-box {
          margin: 18px 0 22px;
          padding: 20px;
          background: var(--void);
          border: 1px solid var(--line);
          display: flex;
          gap: 18px;
          align-items: center;
          flex-wrap: wrap;
        }
        .payment-box img {
          width: 110px;
          height: 110px;
          object-fit: contain;
          background: #fff;
          padding: 6px;
          border-radius: 2px;
        }
        .payment-box .details p { margin: 0 0 6px; font-size: 13px; color: var(--paper-dim); }
        .payment-box .details strong { color: var(--brass); font-family: 'IBM Plex Mono', monospace; }

        .qr-thumb-btn {
          background: none;
          border: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          cursor: zoom-in;
        }
        .qr-thumb-btn img {
          width: 110px;
          height: 110px;
          object-fit: contain;
          background: #fff;
          padding: 6px;
          border-radius: 2px;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .qr-thumb-btn:hover img {
          transform: scale(1.04);
          box-shadow: 0 0 0 2px var(--brass);
        }
        .qr-thumb-hint {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.08em;
          color: var(--paper-dim);
        }

        .qr-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(10, 9, 6, 0.82);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          z-index: 1000;
          animation: qrFadeIn 0.18s ease;
        }
        .qr-modal-card {
          position: relative;
          background: var(--card);
          border: 1px solid var(--brass);
          padding: 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          max-width: 90vw;
          animation: qrScaleIn 0.2s ease;
        }
        .qr-modal-img {
          width: min(70vw, 340px);
          height: min(70vw, 340px);
          object-fit: contain;
          background: #fff;
          padding: 14px;
          border-radius: 2px;
        }
        .qr-modal-caption {
          font-size: 13px;
          color: var(--paper-dim);
          margin: 0;
        }
        .qr-modal-caption strong { color: var(--brass); font-family: 'IBM Plex Mono', monospace; }
        .qr-modal-close {
          position: absolute;
          top: -14px;
          right: -14px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--shutter);
          color: var(--paper);
          border: 2px solid var(--card);
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }
        .qr-modal-close:hover { filter: brightness(1.1); }

        @keyframes qrFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes qrScaleIn {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }

        .actions {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 28px 0 12px;
        }
        button {
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 2px;
        }
        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .btn-submit {
          background: var(--shutter);
          color: var(--paper);
          border: none;
          padding: 12px 26px;
          letter-spacing: 0.02em;
        }
        .btn-submit:hover:not(:disabled) { filter: brightness(1.08); }
        .btn-clear {
          background: transparent;
          color: var(--paper-dim);
          border: 1px solid var(--line);
          padding: 12px 20px;
        }
        .btn-clear:hover:not(:disabled) { color: var(--paper); border-color: var(--brass); }

        .submitting-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 0 20px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.08em;
          color: var(--brass);
        }
        .film-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid var(--line);
          border-top-color: var(--brass);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          flex: 0 0 16px;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .footnote {
          font-size: 11px;
          color: #6b6455;
          padding-bottom: 34px;
        }

        .confirmation {
          padding: 60px 0;
          text-align: center;
        }
        .confirmation .stamp {
          display: inline-block;
          border: 2px solid var(--brass);
          color: var(--brass);
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.2em;
          padding: 8px 18px;
          transform: rotate(-3deg);
          margin-bottom: 20px;
        }
        .confirmation h2 {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 24px;
          margin: 0 0 10px;
        }
        .confirmation p { color: var(--paper-dim); font-size: 14px; max-width: 380px; margin: 0 auto; }

        @media (max-width: 520px) {
          .sheet { padding: 0 24px; }
          .header { flex-wrap: wrap; }
          .roll-counter { margin-left: 0; text-align: left; }
          .one-time-badge__note { margin-left: 0; }
        }
      `}</style>

      <div className="sheet">
        <Sprockets side="left" />
        <Sprockets side="right" />

        <div className="header">
          <AperturePin progress={submitted ? 1 : progress} />
          <div className="header-text">
            <p className="eyebrow">BMPA · ADMISSION ROLL</p>
            <h1>Bapan Mondal Photography Academy</h1>
            <p>Admission Form</p>
          </div>
          {!submitted && (
            <div className="roll-counter">
              <strong>{filledCount}/{requiredKeys.length}</strong>
              required exposed
            </div>
          )}
        </div>

        {!submitted && <FeeStructureSection onZoomQr={() => setQrZoomed(true)} />}
        {qrZoomed && <QrZoomModal onClose={() => setQrZoomed(false)} />}

        {submitted ? (
          <div className="confirmation">
            <div className="stamp">ROLL SUBMITTED</div>
            <h2>Thanks, {form.name.split(" ")[0] || "friend"} — you're in the queue.</h2>
            <p>
              Please send your seat-booking payment of ₹999 to the WhatsApp number below
              and share the screenshot to confirm your seat.
            </p>
            <button className="btn-clear" style={{ marginTop: 24 }} onClick={handleClear}>
              Submit another response
            </button>
          </div>
        ) : (
          <form className="form-body" onSubmit={handleSubmit} noValidate>
            <Frame number={1} label="Course" required>
              <RadioGroup name="course" options={COURSE_OPTIONS} value={form.course} onChange={set("course")} />
              {errors.course && <p className="error-text">{errors.course}</p>}
            </Frame>

            <Frame number={2} label="What is your Name?" required>
              <input type="text" placeholder="Your answer" value={form.name} onChange={(e) => set("name")(e.target.value)} />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </Frame>

            <Frame number={3} label="What is your Mobile Number?" required>
              <input type="tel" placeholder="Your answer" value={form.mobile} onChange={(e) => set("mobile")(e.target.value)} />
              {errors.mobile && <p className="error-text">{errors.mobile}</p>}
            </Frame>

            <Frame number={4} label="What is your WhatsApp Number?" required>
              <input type="tel" placeholder="Your answer" value={form.whatsapp} onChange={(e) => set("whatsapp")(e.target.value)} />
              {errors.whatsapp && <p className="error-text">{errors.whatsapp}</p>}
            </Frame>

            <Frame number={5} label="What is your District?" required>
              <input type="text" placeholder="Your answer" value={form.district} onChange={(e) => set("district")(e.target.value)} />
              {errors.district && <p className="error-text">{errors.district}</p>}
            </Frame>

            <Frame number={6} label="Mostly Interested in?" required>
              <RadioGroup name="interest" options={INTEREST_OPTIONS} value={form.interest} onChange={set("interest")} />
              {errors.interest && <p className="error-text">{errors.interest}</p>}
            </Frame>

            <Frame number={7} label="What is your Full Address?">
              <input type="text" placeholder="Your answer" value={form.address} onChange={(e) => set("address")(e.target.value)} />
            </Frame>

            <Frame number={8} label="Why do you want to join my classes?">
              <CheckboxGroup options={REASON_OPTIONS} values={form.reasons} onToggle={toggleReason} />
            </Frame>

            <Frame number={9} label="Booking Payment Date ">
              <input type="date" value={form.date} onChange={(e) => set("date")(e.target.value)} />
            </Frame>


            <div className="actions">
              <button type="submit" className="btn-submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting…" : "Submit"}
              </button>
              <button type="button" className="btn-clear" onClick={handleClear} disabled={isSubmitting}>
                Clear form
              </button>
            </div>
            {isSubmitting && (
              <div className="submitting-row">
                <span className="film-spinner" aria-hidden="true" />
                <span>Developing your roll — please wait for the server to confirm…</span>
              </div>
            )}
            <p className="text-xxl opacity-40">Wait for 5 sec after submit</p>
            <p className="footnote">Never submit passwords through this form. Fields marked ● are required.</p>
          </form>
        )}
      </div>
    </div>
  );
}