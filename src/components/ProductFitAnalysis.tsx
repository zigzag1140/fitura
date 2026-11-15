import { Icon } from "./Icon";

type ProductFitAnalysisProps = {
  bodyShape?: string; // Menangkap data AI
};

export function ProductFitAnalysis({
  bodyShape = "Mesomorph (Atletis)",
}: ProductFitAnalysisProps) {
  // Logika dinamis berdasarkan bentuk tubuh dari Smart Sizing
  let shoulder = "Ideal (Jatuh bahu pas)";
  let chest = "Nyaman (+4,2 cm kelonggaran)";
  let length = "Proporsional untuk tinggi Anda";

  if (bodyShape.includes("Ectomorph")) {
    shoulder = "Terkontrol (Tidak kedodoran)";
    chest = "Seimbang (Potongan regular)";
    length = "Menutupi pinggul pas";
  } else if (bodyShape.includes("Endomorph")) {
    shoulder = "Rileks (Bebas bergerak)";
    chest = "Longgar menyamarkan siluet";
    length = "Pas tanpa terangkat";
  }

  return (
    <section className="fit-analysis">
      <div className="fit-heading">
        <div>
          <Icon name="sparkles" size={17} />
          <strong>Penilaian Kesesuaian</strong>
        </div>
      </div>
      <div className="fit-rows">
        <div>
          <span>◒ &nbsp; Bahu</span>
          <b>{shoulder}</b>
        </div>
        <div>
          <span>▰ &nbsp; Kelonggaran Dada</span>
          <b>{chest}</b>
        </div>
        <div>
          <span>▯ &nbsp; Panjang</span>
          <b>{length}</b>
        </div>
      </div>
    </section>
  );
}
