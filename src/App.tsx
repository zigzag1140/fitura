import { useEffect, useState } from "react";
import "./App.css";
import { BottomNav } from "./components/BottomNav";
import { FeatureCarousel } from "./components/FeatureCarousel";
import { Header } from "./components/Header";
import { ProductGrid } from "./components/ProductGrid";
import { Icon } from "./components/Icon";
import { CatalogPage as ProductCatalogPage } from "./components/CatalogPage";
import { HomeHero } from "./components/HomeHero";
import { HomeCategoryFilters } from "./components/HomeCategoryFilters";
import { TryOnPage } from "./pages/TryOnPage";
import { SkinTonePage } from "./pages/SkinTonePage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { SmartSizingPage } from "./pages/SmartSizingPage";
import { ProfilePage } from "./pages/ProfilePage";
import { FittingRoomPreview } from "./components/FittingRoomPreview";
import type { Product } from "./components/ProductCard";
import { ProductTryOnResultPage } from "./pages/ProductTryOnResultPage";

type Page =
  | "beranda"
  | "katalog"
  | "simpan"
  | "profil"
  | "tryon"
  | "skin-tone"
  | "product"
  | "product-tryon"
  | "smart-sizing"
  | "fitting-room";

const defaultProduct: Product = {
  name: "Jaket Cokelat",
  category: "PAKAIAN LUAR · PRIA",
  price: "Rp 680.000",
  image:
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=88",
  color_tag: "Warm",
  badge: "RILIS BARU",
};

function getPageFromUrl(): Page {
  const page = window.location.pathname.slice(1) as Page;
  return [
    "beranda",
    "katalog",
    "simpan",
    "profil",
    "tryon",
    "skin-tone",
    "smart-sizing",
    "fitting-room",
    "product-tryon",
  ].includes(page) || page.startsWith("product")
    ? page === "product-tryon"
      ? page
      : page.startsWith("product")
        ? "product"
        : page
    : "beranda";
}

function HomePage({
  onTryOn,
  onSkinTone,
  onSmartSizing,
  onProductOpen,
  onNavigate,
  wishlist,
  onToggleWishlist,
}: {
  onTryOn: () => void;
  onSkinTone: () => void;
  onSmartSizing: () => void;
  onProductOpen: (product: Product) => void;
  onNavigate: (page: Page) => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
}) {
  return (
    <>
      <Header onProfile={() => onNavigate("profil")} />
      <main>
        <div className="content">
          <HomeHero />
          <FeatureCarousel
            onTryOn={onTryOn}
            onSkinTone={onSkinTone}
            onSmartSizing={onSmartSizing}
          />
          <HomeCategoryFilters onBrowse={() => onNavigate("katalog")} />
          <ProductGrid
            onProductOpen={onProductOpen}
            onBrowse={() => onNavigate("katalog")}
            wishlist={wishlist}
            onToggleWishlist={onToggleWishlist}
          />
        </div>
      </main>
    </>
  );
}

function EmptyPage({
  page,
  onBack,
  onNavigate,
}: {
  page: "simpan" | "profil";
  onBack: () => void;
  onNavigate: (page: Page) => void;
}) {
  const isWishlist = page === "simpan";
  return (
    <>
      <Header onProfile={() => onNavigate("profil")} />
      <main className="empty-page">
        <div className="empty-icon">
          <Icon name={isWishlist ? "bookmark" : "profile"} size={28} />
        </div>
        <span className="eyebrow">
          {isWishlist ? "KOLEKSI TERSIMPAN" : "AKUN ANDA"}
        </span>
        <h1>{isWishlist ? "Wishlist" : "Profil"}</h1>
        <p>
          {isWishlist
            ? "Produk favoritmu akan muncul di sini."
            : "Kelola preferensi ukuran dan gaya personalmu."}
        </p>
        <button className="primary-button" onClick={onBack}>
          Kembali ke katalog <Icon name="arrow" size={16} />
        </button>
      </main>
    </>
  );
}

function App() {
  const [page, setPage] = useState<Page>(getPageFromUrl);
  const [pageOrigins, setPageOrigins] = useState<Partial<Record<Page, Page>>>({});
  const [selectedProduct, setSelectedProduct] =
    useState<Product>(defaultProduct);
  const [tryOnPhoto, setTryOnPhoto] = useState("");
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // ==========================================
  // STATE PUSAT UNTUK PROFIL & AI
  // ==========================================
  const [gender, setGender] = useState<"Pria" | "Wanita" | "Unisex">("Pria");
  const [skinTone, setSkinTone] = useState("Belum dianalisis");
  const [recommendedTag, setRecommendedTag] = useState("Neutral");

  const [height, setHeight] = useState("175");
  const [weight, setWeight] = useState("72");
  const [bmi, setBmi] = useState<string | number>("23.5");
  const [bodyShape, setBodyShape] = useState("Mesomorph (Atletis)");
  const [recommendedSize, setRecommendedSize] = useState("L");

  const toggleWishlist = (product: Product) => {
    setWishlist((current) =>
      current.some((item) => item.name === product.name)
        ? current.filter((item) => item.name !== product.name)
        : [...current, product],
    );
  };

  useEffect(() => {
    const handlePopState = () => {
      const nextPage = getPageFromUrl();
      setPageOrigins((origins) => ({ ...origins, [nextPage]: page }));
      setPage(nextPage);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [page]);

  const setPageLocation = (nextPage: Page, rememberOrigin: boolean) => {
    if (rememberOrigin) {
      setPageOrigins((origins) => ({ ...origins, [nextPage]: page }));
    }
    window.history.pushState(
      {},
      "",
      nextPage === "beranda" ? "/" : `/${nextPage}`,
    );
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigate = (nextPage: Page) => setPageLocation(nextPage, true);
  const navigateBack = (nextPage: Page) => setPageLocation(nextPage, false);

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setPageOrigins((origins) => ({ ...origins, product: page }));
    window.history.pushState(
      {},
      "",
      `/product/${encodeURIComponent(product.name)}`,
    );
    setPage("product");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (page === "tryon") {
    return (
      <div className="app-shell">
        <TryOnPage
          onBack={() => navigate("katalog")}
          onWishlist={() => navigate("simpan")}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          onBuy={(product) => {
            setSelectedProduct(product);
            navigate("product");
          }}
          bodyShape={bodyShape} // <-- TAMBAHKAN INI
        />
        <BottomNav
          activePage={page}
          onNavigate={(nextPage) => navigate(nextPage as Page)}
        />
      </div>
    );
  }

  if (page === "skin-tone") {
    return (
      <div className="app-shell">
        <SkinTonePage
          onBack={() => navigateBack(pageOrigins["skin-tone"] ?? "beranda")}
          onTryOn={() => navigate("tryon")}
          onToneDetected={(tone) => {
            // Memisahkan tag warna dari string tone
            setSkinTone(tone);
            if (tone.includes("Warm")) setRecommendedTag("Warm");
            else if (tone.includes("Cool")) setRecommendedTag("Cool");
            else setRecommendedTag("Neutral");
          }}
        />
        <BottomNav
          activePage={page}
          onNavigate={(nextPage) => navigate(nextPage as Page)}
        />
      </div>
    );
  }

  if (page === "product") {
    return (
      <div className="app-shell">
        <ProductDetailPage
          product={selectedProduct}
          onBack={() => navigate("katalog")}
          onTryOn={(product, photoUrl) => {
            setSelectedProduct(product);
            setTryOnPhoto(photoUrl);
            navigate("product-tryon");
          }}
          bodyShape={bodyShape}
          recommendedSize={recommendedSize} // <-- Data AI dari Smart Sizing masuk ke sini
        />
        <BottomNav
          activePage={page}
          onNavigate={(nextPage) => navigate(nextPage as Page)}
        />
      </div>
    );
  }

  if (page === "product-tryon") {
    return (
      <div className="app-shell">
        <ProductTryOnResultPage
          product={selectedProduct}
          photoUrl={tryOnPhoto}
          onBack={() => navigateBack("product")}
          onTryAnother={() => navigateBack("product")}
        />
        <BottomNav
          activePage={page}
          onNavigate={(nextPage) => navigate(nextPage as Page)}
        />
      </div>
    );
  }

  if (page === "smart-sizing") {
    return (
      <div className="app-shell">
        <SmartSizingPage
          onBack={() => navigateBack(pageOrigins["smart-sizing"] ?? "beranda")}
          gender={gender}
          onGenderChange={setGender}
          // Tangkap data dari SmartSizing, lalu simpan ke state App
          onSizingDetected={(h, w, b, shape, size) => {
            setHeight(h);
            setWeight(w);
            setBmi(b);
            setBodyShape(shape);
            setRecommendedSize(size);
          }}
        />
        <BottomNav
          activePage={page}
          onNavigate={(nextPage) => navigate(nextPage as Page)}
        />
      </div>
    );
  }

  if (page === "fitting-room") {
    return (
      <div className="app-shell">
        <FittingRoomPreview onBack={() => navigateBack(pageOrigins["fitting-room"] ?? "profil")} />
        <BottomNav
          activePage={page}
          onNavigate={(nextPage) => navigate(nextPage as Page)}
        />
      </div>
    );
  }

  if (page === "profil") {
    return (
      <ProfilePage
        onHome={() => navigate("beranda")}
        onCatalog={() => navigate("katalog")}
        onSmartSizing={() => navigate("smart-sizing")}
        onTryOn={() => navigate("tryon")}
        onSkinTone={() => navigate("skin-tone")}
        onNavigate={(nextPage) => navigate(nextPage as Page)}
        // Mengirim semua state ke ProfilePage
        gender={gender}
        skinTone={skinTone}
        recommendedTag={recommendedTag}
        height={height}
        weight={weight}
        bmi={bmi}
        bodyShape={bodyShape}
      />
    );
  }

  return (
    <div className="app-shell">
      {page === "simpan" ? (
        <EmptyPage
          page={page}
          onBack={() => navigateBack(pageOrigins[page] ?? "beranda")}
          onNavigate={navigate}
        />
      ) : page === "katalog" ? (
        <ProductCatalogPage
          onProductOpen={openProduct}
          onProfile={() => navigate("profil")}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
        />
      ) : (
        <HomePage
          onTryOn={() => navigate("tryon")}
          onSkinTone={() => navigate("skin-tone")}
          onSmartSizing={() => navigate("smart-sizing")}
          onProductOpen={openProduct}
          onNavigate={navigate}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
        />
      )}
      <BottomNav
        activePage={page}
        onNavigate={(nextPage) => navigate(nextPage as Page)}
      />
    </div>
  );
}

export default App;
