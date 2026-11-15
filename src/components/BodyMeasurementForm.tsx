import { Icon } from './Icon'

type BodyMeasurementFormProps = {
  height: string
  weight: string
  heightUnit: 'cm' | 'ft'
  weightUnit: 'kg' | 'lbs'
  gender: 'Pria' | 'Wanita' | 'Unisex'
  onHeightChange: (value: string) => void
  onWeightChange: (value: string) => void
  onHeightUnitChange: (unit: 'cm' | 'ft') => void
  onWeightUnitChange: (unit: 'kg' | 'lbs') => void
  onGenderChange: (gender: 'Pria' | 'Wanita' | 'Unisex') => void
  onConfirm: () => void
}

export function BodyMeasurementForm({ height, weight, heightUnit, weightUnit, gender, onHeightChange, onWeightChange, onHeightUnitChange, onWeightUnitChange, onGenderChange, onConfirm }: BodyMeasurementFormProps) {
  return (
    <section className="smart-form-card">
      <div className="smart-card-heading"><div><i /> <strong>Masukkan Ukuran Tubuh</strong></div></div>
      <div className="measurement-field">
        <div className="field-label"><div><strong>Tinggi Badan</strong><small>Kalibrasi presisi</small></div><div className="unit-switch">{(['cm', 'ft'] as const).map((unit) => <button key={unit} className={heightUnit === unit ? 'active' : ''} onClick={() => onHeightUnitChange(unit)}>{unit}</button>)}</div></div>
        <div className="measurement-input"><input inputMode="decimal" value={height} onChange={(event) => onHeightChange(event.target.value)} aria-label="Tinggi badan" /><b>{heightUnit}</b></div>
        <input className="measurement-range" type="range" min={heightUnit === 'cm' ? 120 : 3.9} max={heightUnit === 'cm' ? 220 : 7.2} step={heightUnit === 'cm' ? 1 : 0.1} value={height || (heightUnit === 'cm' ? 175 : 5.7)} onChange={(event) => onHeightChange(event.target.value)} aria-label="Atur tinggi badan" />
      </div>
      <div className="measurement-field">
        <div className="field-label"><div><strong>Berat Badan</strong><small>Digunakan untuk proporsi</small></div><div className="unit-switch">{(['kg', 'lbs'] as const).map((unit) => <button key={unit} className={weightUnit === unit ? 'active' : ''} onClick={() => onWeightUnitChange(unit)}>{unit}</button>)}</div></div>
        <div className="measurement-input"><input inputMode="decimal" value={weight} onChange={(event) => onWeightChange(event.target.value)} aria-label="Berat badan" /><b>{weightUnit}</b></div>
        <input className="measurement-range" type="range" min={weightUnit === 'kg' ? 35 : 77} max={weightUnit === 'kg' ? 150 : 330} step={weightUnit === 'kg' ? 1 : 1} value={weight || (weightUnit === 'kg' ? 72 : 159)} onChange={(event) => onWeightChange(event.target.value)} aria-label="Atur berat badan" />
      </div>
      <div className="gender-field">
        <div className="field-label"><div><strong>Jenis Kelamin</strong><small>Untuk rekomendasi ukuran yang lebih relevan</small></div></div>
        <div className="gender-options">
          {(['Pria', 'Wanita'] as const).map((option) => <button key={option} className={gender === option ? 'active' : ''} onClick={() => onGenderChange(option)}>{option}</button>)}
        </div>
      </div>
      <button className="smart-confirm" onClick={onConfirm}><Icon name="check" size={17} /> Konfirmasi</button>
    </section>
  )
}
