import { useParams, Link } from 'react-router-dom'
import BlogPost from '../components/blog/BlogPost.jsx'
import { getPostBySlug } from '../utils/loadMarkdownPosts.js'
import SEO from '../components/SEO.jsx'

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <div className="container-page py-24 text-center">
        <SEO
          title="Post Not Found — Bapan Mondal Photography"
          description="The blog post you're looking for doesn't exist or has been moved."
          url={`https://www.bapanphotography.in/blog/${slug}`}
        />
        <p className="eyebrow mb-4">Not Found</p>
        <h1 className="font-display text-3xl text-parchment">
          This post doesn't exist — or the roll got overexposed.
        </h1>
        <Link to="/blog" className="btn-ghost mt-8 inline-flex">
          Back to the Journal
        </Link>
      </div>
    )
  }

  return (
    <div className="container-page py-16 sm:py-24">
      <SEO
        title={`${post.title} — Bapan Mondal Photography`}
        description={post.excerpt || post.description}
        url={`https://www.bapanphotography.in/blog/${post.slug}`}
        image={post.coverImage}
      />
      <Link
        to="/blog"
        className="mb-10 inline-block font-mono text-[11px] uppercase tracking-widest2 text-parchment-dim hover:text-parchment"
      >
        ← Back to the Journal
      </Link>
      <BlogPost post={post} />
    </div>
  )
}