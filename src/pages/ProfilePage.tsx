import { ProfileCard } from "../components/ProfileCard";
import { ProfileHeader } from "../components/ProfileHeader";
import { ProfileRecommendations } from "../components/ProfileRecommendations";
import { Header } from "../components/Header";
import { BottomNav } from "../components/BottomNav";
import { FeatureCarousel } from "../components/FeatureCarousel";

type ProfilePageProps = {
  onHome: () => void;
  onCatalog: () => void;
  onSmartSizing: () => void;
  onTryOn: () => void;
  onSkinTone: () => void;
  onNavigate: (page: string) => void;
  gender: "Pria" | "Wanita" | "Unisex" | string;
  skinTone: string;
  // Props baru dari state pusat AI
  height?: string;
  weight?: string;
  bmi?: string | number;
  bodyShape?: string;
  recommendedTag?: string;
};

export function ProfilePage({
  onHome,
  onCatalog,
  onSmartSizing,
  onTryOn,
  onSkinTone,
  onNavigate,
  gender,
  skinTone,
  height,
  weight,
  bmi,
  bodyShape,
  recommendedTag,
}: ProfilePageProps) {
  return (
    <div className="profile-page app-shell">
      <Header onProfile={() => undefined} />
      <main className="profile-content">
        <ProfileHeader onSettings={() => undefined} />

        {/* Lempar data biometrik ke ProfileCard */}
        <ProfileCard
          onEdit={() => undefined}
          gender={gender}
          skinTone={skinTone}
          height={height}
          weight={weight}
          bmi={bmi}
          bodyShape={bodyShape}
        />

        {/* Lempar data tag warna dan gender ke Rekomendasi */}
        <ProfileRecommendations
          onMore={onCatalog}
          recommendedTag={recommendedTag}
          gender={gender}
        />

        <FeatureCarousel
          onTryOn={onTryOn}
          onSkinTone={onSkinTone}
          onSmartSizing={onSmartSizing}
        />
        <button className="profile-catalog-button" onClick={onHome}>
          Kembali ke beranda <span>→</span>
        </button>
      </main>
      <BottomNav activePage="profil" onNavigate={onNavigate} />
    </div>
  );
}
