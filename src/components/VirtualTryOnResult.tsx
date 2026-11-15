import { useState, useRef } from "react";
import { Icon } from "./Icon";
import type { TryOnProduct } from "./TryOnProductPicker";

type VirtualTryOnResultProps = {
  top: TryOnProduct;
  bottom: TryOnProduct;
  onBuy: () => void;
  // Tambahkan prop ini untuk menangkap data Smart Sizing dari App.tsx
  bodyShape?: string;
};

export function VirtualTryOnResult({
  top,
  bottom,
  onBuy,
  bodyShape = "Mesomorph (Atletis)",
}: VirtualTryOnResultProps) {
  const [userPhotoUrl, setUserPhotoUrl] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const shortPosture = bodyShape.split(" ")[0];
  const totalPrice = "Rp 1.420.000";

  // Handle pemilihan foto dari perangkat
  const handlePhotoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUserPhotoUrl(URL.createObjectURL(file));
      setError(null);
    }
  };

  // Handle eksekusi ke backend FastAPI
  const handleGenerate = async () => {
    if (!userPhotoUrl) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(userPhotoUrl);
      const blob = await response.blob();
      const file = new File([blob], "user_fullbody.jpg", {
        type: "image/jpeg",
      });

      const formData = new FormData();
      formData.append("file", file);
      formData.append("top_url", top.image);
      formData.append("bottom_url", bottom.image);
      formData.append("top_name", top.name);
      formData.append("bottom_name", bottom.name);

      const apiRes = await fetch("http://127.0.0.1:8000/api/vton/combo", {
        method: "POST",
        body: formData,
      });

      if (!apiRes.ok) throw new Error(`Server Error: ${apiRes.status}`);

      const data = await apiRes.json();
      if (data.status === "success") {
        setResultImage(data.image_base64);
      } else {
        throw new Error(data.error || "Gagal merender AI");
      }
    } catch (err: any) {
      console.error("Combo VTON Error:", err);
      setError(err.message || "Gagal terhubung ke server AI");
    } finally {
      setIsLoading(false);
    }
  };

  // FASE 1: Layar Upload Foto
  if (!resultImage && !isLoading) {
    return (
      <section
        className="virtual-result"
        style={{ padding: "20px", textAlign: "center" }}
      >
        <div style={{ marginBottom: "20px" }}>
          <Icon name="profile" size={40} />
          <h3>Upload Foto Full Badan</h3>
          <p style={{ fontSize: "0.9rem", opacity: 0.8, marginTop: "10px" }}>
            Untuk mencoba Set <strong>{top.name}</strong> dan{" "}
            <strong>{bottom.name}</strong>, silakan unggah foto seluruh badan
            (berdiri tegak, tangan di samping).
          </p>
        </div>

        {userPhotoUrl ? (
          <img
            src={userPhotoUrl}
            alt="Preview"
            style={{
              width: "100%",
              maxHeight: "300px",
              objectFit: "cover",
              borderRadius: "12px",
              marginBottom: "15px",
            }}
          />
        ) : (
          <button
            onClick={() => fileInput.current?.click()}
            style={{
              padding: "30px",
              border: "2px dashed #ccc",
              borderRadius: "12px",
              width: "100%",
              cursor: "pointer",
              background: "transparent",
            }}
          >
            Pilih Foto dari Galeri
          </button>
        )}

        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          onChange={handlePhotoSelect}
          hidden
        />

        {error && (
          <p style={{ color: "red", fontSize: "0.85rem", marginTop: "10px" }}>
            {error}
          </p>
        )}

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          {userPhotoUrl && (
            <button
              onClick={() => fileInput.current?.click()}
              style={{ flex: 1, padding: "12px", borderRadius: "8px" }}
            >
              Ganti Foto
            </button>
          )}
          <button
            onClick={handleGenerate}
            disabled={!userPhotoUrl}
            style={{
              flex: 2,
              padding: "12px",
              borderRadius: "8px",
              background: userPhotoUrl ? "#000" : "#ccc",
              color: "#fff",
            }}
          >
            <Icon name="sparkles" size={15} /> Konfirmasi & Generate
          </button>
        </div>
      </section>
    );
  }

  // FASE 2: Loading State
  if (isLoading) {
    return (
      <section
        className="virtual-result"
        style={{ padding: "40px 20px", textAlign: "center" }}
      >
        <Icon name="sparkles" size={40} />
        <h3 style={{ margin: "15px 0" }}>Menjahit Outfit...</h3>
        <p style={{ opacity: 0.7 }}>
          AI sedang merender atasan dan bawahan ke foto kamu. Membutuhkan waktu
          beberapa detik.
        </p>
      </section>
    );
  }

  // FASE 3: Hasil Generate (Slide & Analisis Dinamis)
  return (
    <section className="virtual-result">
      {/* Inject CSS untuk menyembunyikan scrollbar di slider */}
      <style>{`.hide-scroll::-webkit-scrollbar { display: none; }`}</style>

      <div className="result-label">
        <span>
          <Icon name="sparkles" size={18} />
          Hasil Generate Full Try-On
        </span>
        <b>
          <span>Set</span> Terkonfirmasi
        </b>
      </div>

      <div className="virtual-stage" style={{ padding: 0, overflow: "hidden" }}>
        {/* Kontainer Slider Horizontal */}
        <div
          className="hide-scroll"
          style={{
            display: "flex",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* Slide 1: Hasil AI */}
          <img
            src={resultImage!}
            alt={`Hasil AI ${top.name} dan ${bottom.name}`}
            style={{
              width: "100%",
              flexShrink: 0,
              scrollSnapAlign: "center",
              objectFit: "cover",
            }}
          />
          {/* Slide 2: Foto Asli */}
          <img
            src={userPhotoUrl!}
            alt="Foto Asli Pengguna"
            style={{
              width: "100%",
              flexShrink: 0,
              scrollSnapAlign: "center",
              objectFit: "cover",
            }}
          />
        </div>

        <span className="live-pill" style={{ top: "10px", left: "10px" }}>
          <i /> GESER UNTUK BANDINGKAN
        </span>
        <span className="outfit-chip top-chip">
          <i />
          <strong>
            {top.name} {top.size}
          </strong>
        </span>
        <span className="outfit-chip bottom-chip">
          <i />
          <strong>
            {bottom.name} {bottom.size}
          </strong>
        </span>
      </div>

      <div className="result-caption">
        <span>
          <i /> Outfit berhasil disesuaikan ke tubuhmu
        </span>
        <button>
          Bagikan hasil <Icon name="arrow" size={14} />
        </button>
      </div>

      <section className="tryon-card harmony-card">
        <div className="harmony-heading">
          <div>
            <Icon name="sparkles" size={19} />
            <strong>Analisis AI Lengkap</strong>
          </div>
        </div>
        {/* Teks Dinamis mengikuti postur tubuh asli user */}
        <p>
          Warna dan proporsi atasan {top.name} berpadu seimbang dengan{" "}
          {bottom.name}. Kombinasi ini memberi tampilan rapi untuk profil tubuh{" "}
          <strong>{shortPosture.toLowerCase()}</strong> dan tetap nyaman untuk
          aktivitas harian.
        </p>
        <div className="harmony-tags">
          <span>
            <small>UKURAN ATASAN</small>Atasan {top.size}
          </span>
          <span>
            <small>UKURAN BAWAHAN</small>Bawahan {bottom.size}
          </span>
          <span>
            <small>PROPORSI</small>Seimbang
          </span>
          <span>
            <small>KENYAMANAN</small>Nyaman bergerak
          </span>
        </div>
      </section>

      <div className="tryon-purchase-bar">
        <div>
          <small>Paket 1 Set Lengkap</small>
          <strong>{totalPrice}</strong>
        </div>
        <button onClick={onBuy}>
          <Icon name="cart" size={17} /> Tambah ke keranjang
        </button>
      </div>
    </section>
  );
}
