import { useState } from 'react'
import { Icon } from './Icon'

const slides = [
  {
    eyebrow: 'PERSONAL STYLING BERBASIS AI',
    title: 'Gaya terbaikmu, dimulai dari sini.',
    description: 'Temukan outfit yang terasa personal, pas, dan relevan dengan bantuan AI.',
    action: 'Mulai eksplorasi AI',
    tone: 'hero-slide-green',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=88',
  },
  {
    eyebrow: 'AI FITTING ROOM',
    title: 'Lihat outfit sebelum membelinya.',
    description: 'Coba pakaian secara virtual dan temukan kombinasi yang paling cocok untukmu.',
    action: 'Coba Full Try-On',
    tone: 'hero-slide-dark',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=88',
  },
  {
    eyebrow: 'SMART SIZING',
    title: 'Ukuran pas tanpa ragu.',
    description: 'Profil tubuhmu membantu AI memberi rekomendasi ukuran yang lebih percaya diri.',
    action: 'Ukur dengan AI',
    tone: 'hero-slide-sand',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=88',
  },
]

export function HomeHero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const slide = slides[activeSlide]

  const nextSlide = () => setActiveSlide((current) => (current + 1) % slides.length)

  return (
    <section className={`home-hero ${slide.tone}`}>
      <img className="home-hero-image" src={slide.image} alt="" />
      <div className="home-hero-overlay" />
      <button className="home-hero-nav home-hero-next" onClick={nextSlide} aria-label="Slide berikutnya"><Icon name="arrow" size={18} /></button>
      <div className="home-hero-content">
        <h1>{slide.title}</h1>
        <p>{slide.description}</p>
      </div>
      <div className="home-hero-footer">
        <div className="home-hero-dots">
          {slides.map((item, index) => <button key={item.eyebrow} className={index === activeSlide ? 'active' : ''} onClick={() => setActiveSlide(index)} aria-label={`Slide ${index + 1}`} />)}
        </div>
        <span>{String(activeSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
      </div>
    </section>
  )
}
