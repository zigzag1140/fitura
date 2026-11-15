import { ProductCartBar } from "../components/ProductCartBar";
import { ProductDescription } from "../components/ProductDescription";
import { ProductDetailHeader } from "../components/ProductDetailHeader";
import { ProductFitAnalysis } from "../components/ProductFitAnalysis";
import { ProductGallery } from "../components/ProductGallery";
import { ProductInfo } from "../components/ProductInfo";
import type { Product } from "../components/ProductCard";
import { useState } from "react";
import { ProductTryOnModal } from "../components/ProductTryOnModal";

type ProductDetailPageProps = {
  product: Product;
  onBack: () => void;
  onTryOn: (product: Product, photoUrl: string) => void;
  // 1. Tambahkan penangkap data AI dari App.tsx
  bodyShape?: string;
  recommendedSize?: string;
};

export function ProductDetailPage({
  product,
  onBack,
  onTryOn,
  bodyShape = "Mesomorph (Atletis)", // Fallback aman jika data belum ada
  recommendedSize = "L",
}: ProductDetailPageProps) {
  const [showTryOnModal, setShowTryOnModal] = useState(false);

  return (
    <div className="product-detail-page">
      <ProductDetailHeader onBack={onBack} />
      <main className="product-detail-content">
        <ProductGallery
          product={product}
          onTryOn={() => setShowTryOnModal(true)}
        />

        {/* 2. Lempar data AI ke dalam komponen-komponen ini */}
        <ProductInfo product={product} recommendedSize={recommendedSize} />
        <ProductFitAnalysis bodyShape={bodyShape} />

        <ProductDescription />
      </main>
      <ProductCartBar price={product.price} />
      {showTryOnModal && (
        <ProductTryOnModal
          product={product}
          onClose={() => setShowTryOnModal(false)}
          onConfirm={(photoUrl) => onTryOn(product, photoUrl)}
        />
      )}
    </div>
  );
}
