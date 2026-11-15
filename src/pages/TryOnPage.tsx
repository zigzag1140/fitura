import { useState, useRef } from "react";
import { Icon } from "../components/Icon";
import { TryOnHeader } from "../components/TryOnHeader";
import {
  TryOnProductPicker,
  type TryOnProduct,
} from "../components/TryOnProductPicker";
import { TryOnSummary } from "../components/TryOnSummary";
import { ProductCard, type Product } from "../components/ProductCard";
import { analyzeComboVton } from "../services/vtonService";
import { products } from "../data/products"; // <-- 1. Import data aslimu

// 2. Pisahkan Atasan dan Bawahan secara otomatis dari products.ts
const tops: TryOnProduct[] = products
  .filter(
    (p) =>
      p.category.includes("HOODIE") ||
      p.category.includes("JAKET") ||
      p.category.includes("KEMEJA") ||
      p.category.includes("KAOS"),
  )
  .map((p) => ({
    id: p.name,
    name: p.name,
    price: p.price,
    size: "L",
    image: p.image,
  }));

const bottoms: TryOnProduct[] = products
  .filter(
    (p) =>
      p.category.includes("CELANA") ||
      p.category.includes("JEANS") ||
      p.category.includes("BAWAHAN") ||
      p.category.includes("TRAINING") ||
      p.category.includes("JOGGER") ||
      p.category.includes("CARGO"),
  )
  .map((p) => ({
    id: p.name,
    name: p.name,
    price: p.price,
    size: "32",
    image: p.image,
  }));

type TryOnPageProps = {
  onBack: () => void;
  onWishlist: () => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onBuy: (product: Product) => void;
  bodyShape?: string;
};

export function TryOnPage({
  onBack,
  onWishlist,
  wishlist,
  onToggleWishlist,
  onBuy,
  bodyShape = "Mesomorph (Atletis)",
}: TryOnPageProps) {
  const [selectedTop, setSelectedTop] = useState<TryOnProduct | undefined>(
    tops[0],
  );
  const [selectedBottom, setSelectedBottom] = useState<
    TryOnProduct | undefined
  >(bottoms[0]);

  const [generated, setGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGenerateClick = () => {
    // Sebelumnya memanggil fileInputRef, sekarang cukup tampilkan komponen Result
    // Biarkan VirtualTryOnResult yang mengurus upload fotonya.
    setGenerated(true);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedTop || !selectedBottom) return;

    try {
      setIsLoading(true);
      const result = await analyzeComboVton(
        file,
        selectedTop.image,
        selectedBottom.image,
        selectedTop.name,
        selectedBottom.name,
      );
      setResultImage(result.image_base64);
      setGenerated(true);
    } catch (error) {
      console.error(error);
      alert("Server AI sibuk. Pastikan backend Python menyala.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="tryon-page">
      <TryOnHeader onBack={onBack} />

      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileSelect}
      />

      <main className="tryon-content">
        <div className="tryon-intro">
          <div>
            <h1>Pilih Pakaian Anda</h1>
            <p>Pilih satu atasan dan satu bawahan untuk membuat set outfit.</p>
          </div>
          <button className="tryon-wishlist-button" onClick={onWishlist}>
            <Icon name="bookmark" size={15} /> Wishlist
          </button>
        </div>

        <TryOnProductPicker
          title="Atasan"
          recommendation="Rekomendasi ukuran L"
          products={tops}
          filters={["Semua", "Hoodie", "Kaos", "Kemeja", "Jaket"]}
          selectedId={selectedTop?.id}
          onSelect={(product) => {
            setSelectedTop(product);
            setGenerated(false);
            setResultImage(null);
          }}
        />

        <TryOnProductPicker
          title="Bawahan"
          recommendation="Rekomendasi ukuran 32"
          products={bottoms}
          filters={["Semua", "Training", "Jeans", "Cargo", "Shorts"]}
          selectedId={selectedBottom?.id}
          onSelect={(product) => {
            setSelectedBottom(product);
            setGenerated(false);
            setResultImage(null);
          }}
        />

        <section className="tryon-wishlist-section">
          <div className="tryon-section-title">
            <div>
              <strong>Produk dari Wishlist</strong>
            </div>
            <button className="wishlist-link" onClick={onWishlist}>
              Lihat Wishlist
            </button>
          </div>
          {wishlist.length > 0 ? (
            <div className="tryon-wishlist-track">
              {wishlist.map((product) => (
                <ProductCard
                  key={product.name}
                  product={product}
                  liked
                  onToggleLike={onToggleWishlist}
                  onOpen={onBuy}
                />
              ))}
            </div>
          ) : (
            <div className="tryon-wishlist-empty">
              Belum ada produk tersimpan. Tandai produk favorit dari katalog
              untuk menampilkannya di sini.
            </div>
          )}
        </section>

        {isLoading && (
          <div
            style={{
              textAlign: "center",
              padding: "20px",
              backgroundColor: "#f9f9f9",
              borderRadius: "12px",
              marginBottom: "20px",
            }}
          >
            <Icon name="sparkles" size={24} />
            <p style={{ fontWeight: "bold", marginTop: "10px" }}>
              Sedang memproses set outfit...
            </p>
            <small>Proses ini bisa memakan waktu hingga 1 Menit</small>
          </div>
        )}

        {selectedTop && selectedBottom && !isLoading && (
          <TryOnSummary
            top={selectedTop}
            bottom={selectedBottom}
            bodyShape={bodyShape}
            onRemoveTop={() => {
              setSelectedTop(undefined);
              setGenerated(false);
              setResultImage(null);
            }}
            onRemoveBottom={() => {
              setSelectedBottom(undefined);
              setGenerated(false);
              setResultImage(null);
            }}
            onGenerate={handleGenerateClick}
            generated={generated}
            resultImage={resultImage}
            onBuy={() =>
              onBuy({
                name: `${selectedTop.name} + ${selectedBottom.name}`,
                category: "PAKAIAN LUAR · SET",
                price: "Dihitung di keranjang",
                image: selectedTop.image,
                badge: "SET AI FIT",
                color_tag: "Neutral",
              })
            }
          />
        )}
      </main>
    </div>
  );
}
