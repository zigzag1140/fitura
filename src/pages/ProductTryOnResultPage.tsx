import { useState, useEffect } from "react";
import { Icon } from "../components/Icon";
import type { Product } from "../components/ProductCard";
import logo from "../assets/logo.png";

type ProductTryOnResultPageProps = {
  product: Product;
  photoUrl: string;
  onBack: () => void;
  onTryAnother: () => void;
  // Tambahan prop untuk menerima data AI dinamis
  height?: string;
  weight?: string;
  bodyShape?: string;
  recommendedSize?: string;
};

export function ProductTryOnResultPage({
  product,
  photoUrl,
  onBack,
  onTryAnother,
  height = "175",
  weight = "72",
  bodyShape = "Mesomorph (Atletis)",
  recommendedSize = "L",
}: ProductTryOnResultPageProps) {
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const shortPosture = bodyShape.split(" ")[0];

  useEffect(() => {
    const fetchVton = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(photoUrl);
        const blob = await response.blob();
        const file = new File([blob], "user_photo.jpg", { type: "image/jpeg" });

        const formData = new FormData();
        formData.append("file", file);
        formData.append("garment_url", product.image);
        formData.append("category", "upper_body");
        formData.append("garment_desc", product.name);

        const apiRes = await fetch("http://127.0.0.1:8000/api/vton/single", {
          method: "POST",
          body: formData,
        });

        if (!apiRes.ok) {
          throw new Error(
            `Gagal menghubungi server (Status: ${apiRes.status})`,
          );
        }

        const data = await apiRes.json();

        if (data.status === "success") {
          setResultImage(data.image_base64);
        } else {
          throw new Error(data.error || "Terjadi kesalahan saat render AI");
        }
      } catch (err: any) {
        console.error("VTON Error:", err);
        setError(err.message || "Gagal terhubung ke server AI");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVton();
  }, [photoUrl, product]);

  return (
    <div className="product-tryon-page">
      <header className="tryon-topbar">
        <button className="tryon-back" onClick={onBack} aria-label="Kembali">
          <Icon name="back" size={20} />
        </button>
        <div className="tryon-title">
          <img className="feature-brand-logo" src={logo} alt="FITURA" />
          <strong>Try-On Produk</strong>
        </div>
        <button className="tryon-close" onClick={onBack} aria-label="Tutup">
          <Icon name="close" size={19} />
        </button>
      </header>

      <main className="product-tryon-content">
        <div className="product-tryon-heading">
          <span className="eyebrow accent">HASIL GENERATE</span>
          <h1>{product.name}</h1>
          <p>Satu produk dikalibrasi ke foto dan profil tubuh kamu.</p>
        </div>

        <section className="product-tryon-stage">
          {isLoading ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "40px 20px",
                textAlign: "center",
                gap: "15px",
              }}
            >
              <Icon name="sparkles" size={40} />
              <strong style={{ fontSize: "1.2rem" }}>
                AI Sedang Memproses...
              </strong>
              <p style={{ margin: 0, opacity: 0.7 }}>
                Memproses {product.name} ke foto kamu. Memakan waktu beberapa
                detik.
              </p>
            </div>
          ) : error ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "40px 20px",
                textAlign: "center",
                color: "#ff4444",
              }}
            >
              <Icon name="close" size={40} />
              <strong style={{ margin: "15px 0" }}>Gagal Memproses</strong>
              <p>{error}</p>
            </div>
          ) : (
            <>
              <img
                src={resultImage || photoUrl}
                alt={`Hasil try-on ${product.name}`}
              />
              <span className="tryon-result-pill">
                <i /> HASIL TRY-ON
              </span>
              <span className="tryon-product-pill">
                <Icon name="shirt" size={13} /> {product.name}
              </span>
            </>
          )}
        </section>

        <section className="product-tryon-product">
          <img src={product.image} alt={product.name} />
          <div>
            <span>{product.category}</span>
            <strong>{product.name}</strong>
            <b>{product.price}</b>
          </div>
        </section>

        {/* BAGIAN DINAMIS */}
        <section className="product-ai-analysis">
          <div className="analysis-heading">
            <div>
              <Icon name="sparkles" size={18} />
              <strong>Analisis AI untuk kamu</strong>
            </div>
            <b>SIMULASI</b>
          </div>
          <p>
            Berdasarkan profil {height} cm, {weight} kg, dan bentuk tubuh{" "}
            {shortPosture.toLowerCase()}, ukuran{" "}
            <strong>{recommendedSize}</strong> memberi ruang gerak nyaman.
          </p>
          <div className="analysis-metrics">
            <span>
              <small>REKOMENDASI</small>
              <strong>{recommendedSize}</strong>
              <em>Sesuai profil tubuh</em>
            </span>
          </div>
          <small className="analysis-note">
            <Icon name="check" size={13} /> Analisis ini menggunakan data profil
            dan akan diperkaya model AI saat integrasi aktif.
          </small>
        </section>
        {/* AKHIR BAGIAN DINAMIS */}

        <div className="product-tryon-actions">
          <button onClick={onTryAnother}>Coba foto lain</button>
          <button className="product-tryon-buy">
            <Icon name="cart" size={17} /> Tambah ke keranjang{" "}
            <strong>{product.price}</strong>
          </button>
        </div>
      </main>
    </div>
  );
}
