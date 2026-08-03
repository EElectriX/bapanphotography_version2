import { useMemo, useState } from 'react'
import SectionHeading from '../components/common/SectionHeading.jsx'
import GalleryFilter from '../components/gallery/GalleryFilter.jsx'
import GalleryGrid from '../components/gallery/GalleryGrid.jsx'
import Lightbox from '../components/gallery/Lightbox.jsx'
import galleryData, { categories } from '../data/galleryData.js'
import SEO from '../components/SEO.jsx'

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeIndex, setActiveIndex] = useState(null)

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return galleryData
    return galleryData.filter((image) => image.category === activeCategory)
  }, [activeCategory])

  return (
     <>
      <SEO
        title="Gallery — Bapan Mondal Photography"
        description="Browse a curated gallery of artwork, educational & wedding photography by Bapan Mondal."
        url="https://www.bapanphotography.in/gallery"
        image="https://www.bapanphotography.in/images/gallery/class9.jpg"
      />
    <div className="container-page py-16 sm:py-24">
      <SectionHeading
        eyebrow="The Archive"
        title="Gallery"
        description="A running contact sheet of artwork, educational & wedding work — filter by category or click a frame to view it full size."
      />

      <div className="mt-10">
        <GalleryFilter
          categories={categories}
          active={activeCategory}
          onChange={(category) => {
            setActiveCategory(category)
            setActiveIndex(null)
          }}
        />
      </div>

      <div className="mt-8">
        <GalleryGrid images={filtered} onSelect={setActiveIndex} />
      </div>

      {activeIndex !== null && (
        <Lightbox
          images={filtered}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </div>
    </>
  )
}
