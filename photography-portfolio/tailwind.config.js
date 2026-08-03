/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Darkroom-inspired palette
        ink: {
          DEFAULT: '#121210',   // near-black, base background
          soft: '#1B1B18',      // raised surfaces / cards
          line: '#2C2B26',      // hairlines, borders
        },
        parchment: {
          DEFAULT: '#EDE6D6',   // primary text on dark, light surfaces
          dim: '#B9B2A0',       // secondary text
        },
        safelight: {
          DEFAULT: '#D4A24C',   // amber safelight accent
          bright: '#E6BB6C',
          deep: '#A97C33',
        },
        rust: {
          DEFAULT: '#8B3A2F',   // safelight red, tags / alerts
          bright: '#B4503F',
        },
        teal: {
          DEFAULT: '#2E4A42',   // deep teal secondary
          bright: '#3F6459',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Work Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.35em',
      },
      boxShadow: {
        frame: '0 0 0 1px rgba(237,230,214,0.08), 0 20px 40px -20px rgba(0,0,0,0.6)',
      },
      backgroundImage: {
        grain: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shutter: {
          '0%': { clipPath: 'circle(0% at 50% 50%)' },
          '100%': { clipPath: 'circle(75% at 50% 50%)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both',
        shutter: 'shutter 1.1s cubic-bezier(0.16,1,0.3,1) both',
      },
    },
  },
  plugins: [],
}
