import FacebookReel from '../media/FacebookReel.jsx'

function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function BlogPost({ post }) {
  return (
    <article className="mx-auto max-w-2xl">
      <p className="eyebrow mb-4">{post.category}</p>
      <h1 className="font-display text-3xl font-medium text-parchment sm:text-4xl">
        {post.title}
      </h1>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-widest2 text-parchment-dim">
        {post.author} · {formatDate(post.date)}
      </p>

      {post.cover && (
        <div className="mt-8 aspect-[16/9] overflow-hidden bg-ink-soft">
          <img src={post.cover} alt={post.title} className="h-full w-full object-cover" />
        </div>
      )}

      {post.link && (
  <div className="mt-8">
    <FacebookReel href={post.link} className="mx-auto aspect-[9/16] max-w-xs" />
  </div>
)}

      <div
        className="prose-blog mt-10 space-y-6 text-[15px] leading-relaxed text-parchment-dim [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-parchment [&_h2]:mt-10 [&_h2]:mb-2 [&_p]:mb-4 [&_strong]:text-parchment"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  )
}
