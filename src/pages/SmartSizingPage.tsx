import { useState } from "react";
import { BodyMeasurementForm } from "../components/BodyMeasurementForm";
import { SmartSizingHeader } from "../components/SmartSizingHeader";
import { SmartSizingResult } from "../components/SmartSizingResult";
import { analyzeSmartSizing } from "../services/vtonService"; // <-- 1. Import API

type SmartSizingPageProps = {
  onBack: () => void;
  gender: "Pria" | "Wanita" | "Unisex";
  onGenderChange: (gender: "Pria" | "Wanita" | "Unisex") => void;
  onSizingDetected?: (
    height: string,
    weight: string,
    bmi: string | number,
    bodyShape: string,
    recommendedSize: string,
  ) => void;
};

export function SmartSizingPage({
  onBack,
  gender,
  onGenderChange,
  onSizingDetected, // <-- PERBAIKAN 1: Menangkap prop dari App.tsx
}: SmartSizingPageProps) {
  const [height, setHeight] = useState("175");
  const [weight, setWeight] = useState("72");
  const [heightUnit, setHeightUnit] = useState<"cm" | "ft">("cm");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");

  // 2. State untuk AI (menggantikan 'confirmed' manual)
  const [sizingData, setSizingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const changeHeightUnit = (unit: "cm" | "ft") => {
    if (unit === heightUnit) return;
    const value = Number(height);
    if (!Number.isFinite(value)) return;
    setHeight(
      unit === "cm"
        ? String(Math.round(value * 30.48))
        : (value / 30.48).toFixed(1),
    );
    setHeightUnit(unit);
  };

  const changeWeightUnit = (unit: "kg" | "lbs") => {
    if (unit === weightUnit) return;
    const value = Number(weight);
    if (!Number.isFinite(value)) return;
    setWeight(
      unit === "kg"
        ? String(Math.round(value / 2.20462))
        : String(Math.round(value * 2.20462)),
    );
    setWeightUnit(unit);
  };

  // 3. Fungsi menembak API AI
  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      // Pastikan backend selalu menerima cm dan kg meskipun user memakai ft atau lbs
      const tb_cm =
        heightUnit === "ft"
          ? String(Math.round(Number(height) * 30.48))
          : height;
      const bb_kg =
        weightUnit === "lbs"
          ? String(Math.round(Number(weight) / 2.20462))
          : weight;

      const result = await analyzeSmartSizing(tb_cm, bb_kg, gender);
      setSizingData(result);

      // <-- PERBAIKAN 2: Melempar data ke App.tsx agar Profil terupdate otomatis!
      if (onSizingDetected) {
        onSizingDetected(
          tb_cm,
          bb_kg,
          result.bmi,
          result.bodyShape,
          result.recommendedSize,
        );
      }
    } catch (error) {
      console.error(error);
      alert("Gagal menghubungi server AI");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="smart-page">
      <SmartSizingHeader onBack={onBack} />
      <main className="smart-content">
        <div className="smart-intro">
          <span />
          <h1>Smart Sizing</h1>
          <p>Dapatkan rekomendasi size yang akurat menurut data anda.</p>
        </div>
        <BodyMeasurementForm
          height={height}
          weight={weight}
          heightUnit={heightUnit}
          weightUnit={weightUnit}
          gender={gender}
          onHeightChange={(value) => {
            setHeight(value);
            setSizingData(null);
          }}
          onWeightChange={(value) => {
            setWeight(value);
            setSizingData(null);
          }}
          onHeightUnitChange={changeHeightUnit}
          onWeightUnitChange={changeWeightUnit}
          onGenderChange={(value) => {
            onGenderChange(value);
            setSizingData(null);
          }}
          onConfirm={handleConfirm} // <-- Memanggil API AI
        />

        {/* Indikator loading */}
        {isLoading && (
          <p
            style={{
              textAlign: "center",
              marginTop: "10px",
              fontWeight: "bold",
            }}
          >
            ⏳ Menghitung Somatotype...
          </p>
        )}

        {/* Mengirimkan 'data' ke SmartSizingResult saat berhasil */}
        {sizingData && (
          <SmartSizingResult
            height={height}
            weight={weight}
            heightUnit={heightUnit}
            weightUnit={weightUnit}
            gender={gender}
            data={sizingData}
          />
        )}
      </main>
    </div>
  );
}
