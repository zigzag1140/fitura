import { useState, useEffect } from "react";
import type { Product } from "./ProductCard";

type ProductInfoProps = {
  product: Product;
  recommendedSize?: string; // Tambahan prop untuk ukuran AI
};

const sizes = ["S", "M", "L", "XL", "XXL"];

export function ProductInfo({
  product,
  recommendedSize = "L",
}: ProductInfoProps) {
  // State ukuran yang dipilih user (default otomatis di-set ke rekomendasi AI)
  const [selectedSize, setSelectedSize] = useState(recommendedSize);

  // Memastikan jika data AI berubah, default ukuran ikut berubah
  useEffect(() => {
    setSelectedSize(recommendedSize);
  }, [recommendedSize]);

  return (
    <>
      <section className="detail-info">
        <div>
          <span className="detail-category">{product.category}</span>
          {/* Hapus hardcode agar nama asli produk dari katalog muncul */}
          <h1>{product.name}</h1>
          <div className="rating">
            <b>4.9</b>
            <span>★★★★★</span>
            <small>(128 ulasan)</small>
          </div>
        </div>
        <strong className="detail-price">{product.price}</strong>
      </section>

      <section className="size-section">
        <div className="size-heading">
          <strong>Pilih Ukuran</strong>
        </div>
        <div className="size-options">
          {sizes.map((size) => (
            <button
              className={selectedSize === size ? "active" : ""}
              onClick={() => setSelectedSize(size)}
              key={size}
            >
              {size}
              {/* Bintang indikator AI FIT akan selalu berada di ukuran rekomendasi */}
              {size === recommendedSize && <i />}
            </button>
          ))}
        </div>
        <div className="size-recommendation">
          <div>
            {/* Teks rekomendasi paten menggunakan data AI, bukan selectedSize */}
            <strong>Rekomendasi : Ukuran {recommendedSize}</strong>
            <span>Berdasarkan profil tubuh Anda</span>
          </div>
        </div>
      </section>
    </>
  );
}
