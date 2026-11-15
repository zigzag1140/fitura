import { Icon, type IconName } from './Icon'
import skinToneImage from '../assets/skintone.jpeg'
import smartSizingImage from '../assets/smartsizing.jpg'
import fullTryOnImage from '../assets/fulltryon.jpeg'

type Feature = {
  title: string
  description: string
  icon: IconName
  image: string
  action: string
}

type FeatureCarouselProps = {
  onTryOn: () => void
  onSkinTone: () => void
  onSmartSizing: () => void
}

const features: Feature[] = [
  { title: 'Full Try On', description: 'Simulasi pakaian lengkap', icon: 'layers', image: fullTryOnImage, action: 'Coba Sekarang' },
  { title: 'Smart Sizing', description: 'Coba outfit instan', icon: 'shirt', image: smartSizingImage, action: 'Cek Ukuran' },
  { title: 'Analisis Warna Kulit AI', description: 'Temukan palet sempurna', icon: 'sparkles', image: skinToneImage, action: 'Mulai Analisis' },
]

export function FeatureCarousel({ onTryOn, onSkinTone, onSmartSizing }: FeatureCarouselProps) {
  return (
    <section className="feature-section">
      <div className="section-label-row">
        <span className="eyebrow accent">Temukan Gaya Terbaikmu dengan AI</span>
        
      </div>
      <div className="feature-track">
        {features.map((feature, index) => (
          <article
            className={`feature-card feature-card-${index + 1} ${index === 0 ? 'active' : ''}`}
            key={feature.title}
            onClick={feature.title === 'Full Try On' ? onTryOn : feature.title === 'Analisis Warna Kulit AI' ? onSkinTone : onSmartSizing}
          >
            <img className="feature-card-image" src={feature.image} alt="" />
            <button className="feature-cta" onClick={(event) => {
              event.stopPropagation()
              if (feature.title === 'Full Try On') onTryOn()
              else if (feature.title === 'Analisis Warna Kulit AI') onSkinTone()
              else onSmartSizing()
            }}>{feature.action}<Icon name="arrow" size={14} /></button>
          </article>
        ))}
      </div>
    </section>
  )
}
