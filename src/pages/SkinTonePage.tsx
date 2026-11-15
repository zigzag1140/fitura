import { useState } from "react";
import { SkinScanCard } from "../components/SkinScanCard";
import { SkinToneHeader } from "../components/SkinToneHeader";
import { SkinToneRecommendations } from "../components/SkinToneRecommendations";
import { SkinToneResult } from "../components/SkinToneResult";
import { analyzeSkinTone } from "../services/vtonService"; // <-- Import API

type SkinTonePageProps = {
  onBack: () => void;
  onTryOn: () => void;
  onToneDetected: (tone: string) => void;
};

export function SkinTonePage({
  onBack,
  onTryOn,
  onToneDetected,
}: SkinTonePageProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [skinData, setSkinData] = useState<any>(null); // <-- State penyimpan data AI
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (!imageUrl) return;

    setIsLoading(true);
    try {
      // Mengubah URL gambar dari frontend menjadi format File yang bisa dikirim ke Python
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], "skintone.jpg", { type: "image/jpeg" });

      // Tembak API
      const result = await analyzeSkinTone(file);
      setSkinData(result);

      // Update label di header (opsional, menyesuaikan fungsi aslimu)
      onToneDetected(`${result.undertone} ${result.skinTone}`);
    } catch (error) {
      console.error(error);
      alert("Gagal menganalisis warna kulit. Pastikan server AI aktif.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="skintone-page">
      <SkinToneHeader onBack={onBack} />
      <main className="skintone-content">
        <SkinScanCard
          imageUrl={imageUrl}
          onImageChange={(url) => {
            setImageUrl(url);
            setSkinData(null);
          }}
          onConfirm={handleConfirm} // <-- Panggil fungsi API di sini
        />

        {/* Indikator Loading Tanpa Merusak Desain */}
        {isLoading && (
          <p
            style={{
              textAlign: "center",
              marginTop: "10px",
              fontWeight: "bold",
            }}
          >
            ⏳ AI Sedang Menganalisis Pigmen Kulit...
          </p>
        )}

        {/* Tampilkan Hasil Hanya Jika AI Sudah Selesai */}
        {skinData && (
          <>
            <SkinToneResult data={skinData} />
            <SkinToneRecommendations
              onTryOn={onTryOn}
              recommendedTag={skinData.recommendedTag}
            />
          </>
        )}
      </main>
    </div>
  );
}
