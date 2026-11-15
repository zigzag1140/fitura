import { Icon } from "./Icon";
import { products } from "../data/products";

type SkinToneRecommendationsProps = {
  onTryOn: () => void;
  recommendedTag?: string;
};

export function SkinToneRecommendations({
  onTryOn,
  recommendedTag = "Neutral",
}: SkinToneRecommendationsProps) {
  const pyTag = recommendedTag === "Netral" ? "Neutral" : recommendedTag;

  // 1. Ambil semua produk yang cocok dengan warna kulit atau warna netral
  const matchingProducts = products.filter(
    (item) => item.color_tag === pyTag || item.color_tag === "Neutral",
  );

  // 2. Prioritaskan warna persis (Warm/Cool) daripada warna Netral
  const exactMatches = matchingProducts.filter((p) => p.color_tag === pyTag);
  const neutralMatches = matchingProducts.filter(
    (p) => p.color_tag === "Neutral",
  );
  const sortedMatches = [...exactMatches, ...neutralMatches];

  // 3. Algoritma Pemilihan Kategori Beragam (Maksimal 4 Item)
  const diverseItems: typeof products = [];
  const seenCategories = new Set();

  for (const item of sortedMatches) {
    // Ambil kata pertama dari kategori (misal: "CELANA", "JAKET", "HOODIE", "KEMEJA")
    const baseCategory = item.category.split(" ")[0];

    if (!seenCategories.has(baseCategory)) {
      seenCategories.add(baseCategory);
      diverseItems.push(item);
    }

    // Hentikan jika sudah mendapat 4 item dari kategori yang berbeda
    if (diverseItems.length === 4) break;
  }

  // Fallback: Jika variasi kategori kurang dari 4, isi sisanya dengan pakaian lain yang cocok
  if (diverseItems.length < 4) {
    for (const item of sortedMatches) {
      if (!diverseItems.some((i) => i.name === item.name)) {
        diverseItems.push(item);
      }
      if (diverseItems.length === 4) break;
    }
  }

  return (
    <section className="skin-recommendations">
      <div className="recommendation-heading">
        <div>
          <h2>Pakaian Sesuai Warna Kulit</h2>
          <p>Rekomendasi instan dari lemari katalog</p>
        </div>
        {/* Angka jumlah item otomatis mengikuti data */}
        <span>{diverseItems.length} ITEM</span>
      </div>

      {diverseItems.map((item) => (
          <article className="recommendation-item" key={item.name}>
            <div className="recommendation-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="recommendation-copy">
              <small>
                <i /> {item.category}
              </small>
              <strong>{item.name}</strong>
              <b>{item.price}</b>
            </div>
            <button aria-label={`Lihat ${item.name}`}>
              <Icon name="arrow" size={17} />
            </button>
          </article>
        ))}

      <button className="recommendation-tryon" onClick={onTryOn}>
        <Icon name="layers" size={17} /> Uji Coba Full Try-On
      </button>
    </section>
  );
}
