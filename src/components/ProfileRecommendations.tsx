import { Icon } from "./Icon";
import { products } from "../data/products";

type ProfileRecommendationsProps = {
  onMore: () => void;
  recommendedTag?: string;
  gender?: string;
};

export function ProfileRecommendations({
  onMore,
  recommendedTag = "Neutral",
  gender = "PRIA",
}: ProfileRecommendationsProps) {
  const pyTag = recommendedTag === "Netral" ? "Neutral" : recommendedTag;

  // 1. Filter Dinamis berdasarkan Gender dan Warna Kulit
  const recommendedItems = products
    .filter((item) => {
      const isGenderMatch =
        item.gender === gender.toUpperCase() || item.gender === "UNISEX";
      const isTagMatch =
        item.color_tag === pyTag || item.color_tag === "Neutral";
      return isGenderMatch && isTagMatch;
    })
    .sort((a, b) => {
      // Prioritaskan warna persis dengan kulit di urutan teratas
      if (a.color_tag === pyTag && b.color_tag !== pyTag) return -1;
      if (a.color_tag !== pyTag && b.color_tag === pyTag) return 1;
      return 0;
    })
    .slice(0, 4); // Ambil 4 teratas agar desain aman

  return (
    <section className="profile-recommendations">
      <div className="recommendations-heading">
        <div>
          <span className="eyebrow">PILIHAN AI UNTUKMU</span>
          <h2>Produk yang melengkapi setelan</h2>
        </div>
        <Icon name="sparkles" size={18} />
      </div>
      <div className="recommendation-list">
        {recommendedItems.map((product) => {
          return (
            <article className="recommendation-card" key={product.name}>
              <div className="recommendation-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="recommendation-copy">
                <div>
                  <small>{product.category}</small>
                  <strong>{product.price}</strong>
                </div>
                <h3>{product.name}</h3>
                <p>
                  Perlindungan AI: Dirancang untuk memberi kenyamanan dan
                  tampilan yang selaras.
                </p>
                <div className="recommendation-actions">
                  <button>
                    <Icon name="cart" size={13} /> Tambah
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <button className="profile-more-recommendations" onClick={onMore}>
        Lihat rekomendasi lainnya <Icon name="arrow" size={15} />
      </button>
    </section>
  );
}
