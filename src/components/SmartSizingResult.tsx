import { Icon } from "./Icon";

type SmartSizingResultProps = {
  height?: string;
  weight?: string;
  heightUnit?: "cm" | "ft";
  weightUnit?: "kg" | "lbs";
  gender?: string;
  data?: any;
};

export function SmartSizingResult({
  height = "175",
  weight = "72",
  heightUnit = "cm",
  weightUnit = "kg",
  gender = "PRIA",
  data,
}: SmartSizingResultProps) {
  const bodyShape = data?.bodyShape || "Mesomorph (Atletis)";
  const recommendedSize = data?.recommendedSize || "L";
  const bmi = data?.bmi || 23.5;

  const posture = bodyShape.split(" ")[0];

  return (
    <section className="smart-result-card">
      <div className="smart-result-heading">
        <div>
          <Icon name="sparkles" size={18} />
          <strong>Hasil Analisa Postur AI</strong>
        </div>
        
      </div>

      <div className="body-profile">
        <div>
          <small>PROFIL TERDETEKSI</small>
          <strong>{bodyShape}</strong>
          <span>
            {gender} · {height} {heightUnit} · {weight} {weightUnit} · Kalkulasi
            Biometrik
          </span>
        </div>
      </div>

      <div className="smart-recommendation">
        <div>
          <strong>Rekomendasi ukuran teratas</strong>
          <span>Berdasarkan proporsi tinggi dan berat badan kamu</span>
        </div>
        <b>{recommendedSize}</b>
      </div>

      <div className="body-metrics">
        <span>
          <small>Skor BMI</small>
          <strong>{bmi}</strong>
        </span>
        <span>
          <small>Postur</small>
          <strong>{posture}</strong>
        </span>
      </div>
    </section>
  );
}
