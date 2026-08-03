import SectionHeading from '../components/common/SectionHeading.jsx'
import BlogCard from '../components/blog/BlogCard.jsx'
import { getAllPosts } from '../utils/loadMarkdownPosts.js'
import SEO from '../components/SEO.jsx'

export default function Blog() {
  const posts = getAllPosts()

  return (
      <>
      <SEO
        title="Photography Blog — Bapan Mondal Photography Academy"
        description="Tips, techniques, and insights on portrait, editorial & documentary photography from Bapan Mondal."
        url="https://www.bapanphotography.in/blog"
      />
    <div className="container-page py-16 sm:py-24">
      <SectionHeading
        eyebrow="Journal"
        title="Notes from the studio"
        description="Occasional writing on process, gear, and the business of photographing people."
      />

      <div className="mt-14 grid gap-8 sm:grid-cols-2">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
    </>
  )
}
