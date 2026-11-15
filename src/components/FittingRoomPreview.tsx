import { Icon } from './Icon'
import logo from '../assets/logo.png'

type FittingRoomPreviewProps = {
  onBack: () => void
}

export function FittingRoomPreview({ onBack }: FittingRoomPreviewProps) {
  return (
    <div className="fitting-page">
      <header className="fitting-topbar">
        <button onClick={onBack} aria-label="Kembali"><Icon name="back" size={20} /></button>
        <div><img className="feature-brand-logo" src={logo} alt="FITURA" /><strong>AI Fitting Room</strong></div>
        <button aria-label="Tutup"><Icon name="close" size={19} /></button>
      </header>
      <main className="fitting-content">
        <div className="fitting-title"><span className="eyebrow">HASIL SIMULASI VIRTUAL</span><h1>Casual Hoodie Hitam</h1><p>Preview outfit yang sudah dikalibrasi dengan profil tubuh kamu.</p></div>
        <section className="fitting-stage">
          <img src="/images/futura-example.jpg" alt="AI fitting room preview" />
          <span className="fitting-label"><Icon name="sparkles" size={13} /> AI FIT · Alex 178 cm</span>
          <div className="fitting-controls"><button aria-label="Putar avatar"><Icon name="shuffle" size={16} /></button><button aria-label="Perbesar"><Icon name="search" size={16} /></button></div>
        </section>
        <section className="fitting-set">
          <div><span>PAKAIAN LUAR + CELANA</span><strong>Casual Hoodie Hitam + Celana Cargo</strong><small>Atasan L · Celana 32 · Disesuaikan untuk postur Atletis</small></div>
          <b>Rp 1.420.000</b>
        </section>
        <button className="fitting-buy"><Icon name="cart" size={18} /> Beli Seluruh Setelan <strong>Rp 1.420.000</strong></button>
      </main>
    </div>
  )
}
