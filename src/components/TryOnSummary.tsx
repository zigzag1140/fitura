import { Icon } from "./Icon";
import type { TryOnProduct } from "./TryOnProductPicker";
import { VirtualTryOnResult } from "./VirtualTryOnResult";

type TryOnSummaryProps = {
  top: TryOnProduct;
  bottom: TryOnProduct;
  onRemoveTop: () => void;
  onRemoveBottom: () => void;
  onGenerate: () => void;
  generated: boolean;
  onBuy: () => void;
  resultImage?: string | null;
  bodyShape?: string;
};

export function TryOnSummary({
  top,
  bottom,
  onRemoveTop,
  onRemoveBottom,
  onGenerate,
  generated,
  onBuy,
  bodyShape,
}: TryOnSummaryProps) {
  return (
    <>
      <section className="tryon-card selected-box">
        <div className="tryon-card-heading">
          <div>
            <Icon name="layers" size={18} />
            <strong>Kotak Produk Terpilih</strong>
          </div>
          <span>1 SET LENGKAP</span>
        </div>
        <div className="selected-item">
          <img src={top.image} alt={top.name} />
          <div>
            <small>ATASAN TERPILIH · Ukuran {top.size} (AI Fit)</small>
            <strong>{top.name}</strong>
            <span>{top.price}</span>
          </div>
          <button
            className="selected-remove"
            onClick={onRemoveTop}
            aria-label={`Hapus ${top.name}`}
          >
            <Icon name="close" size={15} />
          </button>
        </div>
        <div className="selected-item">
          <img src={bottom.image} alt={bottom.name} />
          <div>
            <small>BAWAHAN TERPILIH · Ukuran {bottom.size} (AI Fit)</small>
            <strong>{bottom.name}</strong>
            <span>{bottom.price}</span>
          </div>
          <button
            className="selected-remove"
            onClick={onRemoveBottom}
            aria-label={`Hapus ${bottom.name}`}
          >
            <Icon name="close" size={15} />
          </button>
        </div>
      </section>
      <section className="generate-card">
        <div>
          <div>
            <strong>Konfirmasi pilihan pakaian</strong>
            <small>Hasil try-on akan tampil di bawah pilihan ini</small>
          </div>
        </div>
        <button onClick={onGenerate}>
          {generated ? "Hasil sudah diperbarui" : "Konfirmasi & Generate"}
        </button>
      </section>
      {generated && (
        <VirtualTryOnResult
          top={top}
          bottom={bottom}
          onBuy={onBuy}
          bodyShape={bodyShape}
        />
      )}
    </>
  );
}
