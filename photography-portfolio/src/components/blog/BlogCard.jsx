import { Link } from 'react-router-dom'

function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function BlogCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block border border-ink-line transition-colors hover:border-safelight/50"
    >
      <div className="aspect-[16/10] overflow-hidden bg-ink-soft">
        <img
          src={post.cover}
          alt={post.title}
          loading="lazy"
          className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
        />
      </div>
      <div className="p-6">
        <p className="font-mono text-[11px] uppercase tracking-widest2 text-safelight">
          {post.category} · {formatDate(post.date)}
        </p>
        <h3 className="mt-3 font-display text-xl text-parchment group-hover:text-safelight-bright">
          {post.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-parchment-dim">
          {post.excerpt}
        </p>
        <span className="mt-4 inline-block font-mono text-[11px] uppercase tracking-widest2 text-parchment-dim group-hover:text-parchment">
          Read the post →
        </span>
      </div>
    </Link>
  )
}
