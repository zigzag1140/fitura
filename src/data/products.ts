import celanaChino from '../assets/celana/Celana Chino Abu.webp'
import celanaGajah from '../assets/celana/celana gajah putih.webp'
import celanaJeansHitam from '../assets/celana/celana jeans hitam.webp'
import celanaJeansPanjang from '../assets/celana/Celana Jeans Panjang abu.webp'
import celanaJorge from '../assets/celana/celana jorge jeans biru.webp'
import celanaDailyWanita from '../assets/celana/Celana Panjang Daily Wanita pink.webp'
import celanaTrainingCocok from '../assets/celana/celana training cocok coklat.webp'
import celanaTrainingHitam from '../assets/celana/celana training hitam.webp'
import jogerAbu from '../assets/celana/Joger Abu.webp'
import cargoHijau from '../assets/celana/long cargo hijau.webp'
import hoodieAbu from '../assets/Hoodie/Hoodie/abu.webp'
import hoodieBiru from '../assets/Hoodie/Hoodie/biru.webp'
import hoodieCoklat from '../assets/Hoodie/Hoodie/coklat.webp'
import hoodieHijau from '../assets/Hoodie/Hoodie/hijau.webp'
import hoodieHitam from '../assets/Hoodie/Hoodie/hitam.webp'
import hoodieKuning from '../assets/Hoodie/Hoodie/kuning.webp'
import hoodieMerah from '../assets/Hoodie/Hoodie/merah.webp'
import hoodiePink from '../assets/Hoodie/Hoodie/pink.webp'
import hoodiePutih from '../assets/Hoodie/Hoodie/putih.webp'
import hoodieUngu from '../assets/Hoodie/Hoodie/ungu.webp'
import jaketHujan from '../assets/Jaket/Jaket/jaket anti hujan hitam.webp'
import jaketDenimHitam from '../assets/Jaket/Jaket/jaket denim hitam.webp'
import jaketDenim from '../assets/Jaket/Jaket/jaket denim biru.webp'
import jaketGelembung from '../assets/Jaket/Jaket/jaket gelembung biru.webp'
import jaketGunung from '../assets/Jaket/Jaket/jaket gunung coklat.webp'
import jaketKulit from '../assets/Jaket/Jaket/jaket kulit hitam.webp'
import jaketParasut from '../assets/Jaket/Jaket/jaket parasut hitam.webp'
import jaketPutih from '../assets/Jaket/Jaket/jaket putih.webp'
import jaketNavy from '../assets/Jaket/Jaket/jaket smith navy.webp'
import jaketVarsity from '../assets/Jaket/Jaket/jaket varsity hitam putih.webp'
import kemejaOxford from '../assets/kemeja/Pria/01_pria_oxford_putih.png'
import kemejaFlanel from '../assets/kemeja/Pria/02_pria_flanel_merah_hitam.jpg'
import kemejaDenim from '../assets/kemeja/Pria/03_pria_denim_biru_tua.jpg'
import kemejaLinen from '../assets/kemeja/Pria/04_pria_linen_hijau_sage.jpg'
import kemejaGaris from '../assets/kemeja/Wanita/05_wanita_garis_pink_putih.jpg'
import kemejaSatin from '../assets/kemeja/Wanita/06_wanita_satin_beige.jpg'
import kemejaCrop from '../assets/kemeja/Wanita/07_wanita_cropped_lavender.jpg'
import kaosAbu from '../assets/tshirt/tshirt_abu.webp'
import kaosBiru from '../assets/tshirt/tshirt_biru.webp'
import kaosHijau from '../assets/tshirt/tshirt_hijau.webp'
import kaosHitam from '../assets/tshirt/tshirt_hitam.webp'
import kaosKuning from '../assets/tshirt/tshirt_kuning.webp'
import kaosMerah from '../assets/tshirt/tshirt_merah.webp'
import kaosOren from '../assets/tshirt/tshirt_oren.webp'
import kaosPink from '../assets/tshirt/tshirt_pink.webp'
import kaosPutih from '../assets/tshirt/tshirt_putih.webp'
import kaosUngu from '../assets/tshirt/tshirt_ungu.webp'
import type { Product, ProductColorTag } from '../components/ProductCard'

type CatalogProduct = Product & {
  gender: 'PRIA' | 'WANITA' | 'UNISEX'
  color_tag: ProductColorTag
}

const item = (name: string, category: string, price: string, image: string, gender: CatalogProduct['gender'], color_tag: ProductColorTag, badge?: string): CatalogProduct => ({
  name,
  category: `${category} · ${gender}`,
  price,
  image,
  gender,
  color_tag,
  ...(badge ? { badge } : {}),
})

export const products: CatalogProduct[] = [
  item('Celana Chino Abu', 'CELANA', 'Rp 459.000', celanaChino, 'PRIA', 'Neutral'),
  item('Celana Gajah Relaxed', 'CELANA', 'Rp 499.000', celanaGajah, 'WANITA', 'Neutral'),
  item('Celana Jeans Hitam', 'JEANS', 'Rp 579.000', celanaJeansHitam, 'UNISEX', 'Neutral', 'BEST SELLER'),
  item('Celana Jeans Panjang', 'JEANS', 'Rp 599.000', celanaJeansPanjang, 'UNISEX', 'Neutral'),
  item('Jorge Straight Jeans', 'JEANS', 'Rp 549.000', celanaJorge, 'PRIA', 'Cool'),
  item('Celana Panjang Daily', 'BAWAHAN', 'Rp 429.000', celanaDailyWanita, 'WANITA', 'Cool'),
  item('Celana Training Cocok', 'TRAINING', 'Rp 389.000', celanaTrainingCocok, 'UNISEX', 'Warm'),
  item('Celana Training Hitam', 'TRAINING', 'Rp 399.000', celanaTrainingHitam, 'UNISEX', 'Neutral'),
  item('Joger Abu Essential', 'JOGGER', 'Rp 419.000', jogerAbu, 'PRIA', 'Neutral'),
  item('Long Cargo Hijau', 'CARGO', 'Rp 529.000', cargoHijau, 'PRIA', 'Warm', 'TRENDING'),
  item('Hoodie Abu Basic', 'HOODIE', 'Rp 529.000', hoodieAbu, 'UNISEX', 'Neutral'),
  item('Hoodie Biru Daily', 'HOODIE', 'Rp 549.000', hoodieBiru, 'UNISEX', 'Cool'),
  item('Hoodie Coklat Earthy', 'HOODIE', 'Rp 579.000', hoodieCoklat, 'UNISEX', 'Warm'),
  item('Hoodie Hijau Olive', 'HOODIE', 'Rp 599.000', hoodieHijau, 'PRIA', 'Warm', 'AI REKOMENDASI'),
  item('Hoodie Hitam Essential', 'HOODIE', 'Rp 569.000', hoodieHitam, 'UNISEX', 'Neutral'),
  item('Hoodie Kuning Bright', 'HOODIE', 'Rp 539.000', hoodieKuning, 'UNISEX', 'Warm'),
  item('Hoodie Merah Bold', 'HOODIE', 'Rp 559.000', hoodieMerah, 'UNISEX', 'Warm'),
  item('Hoodie Pink Soft', 'HOODIE', 'Rp 549.000', hoodiePink, 'WANITA', 'Cool'),
  item('Hoodie Putih Clean', 'HOODIE', 'Rp 529.000', hoodiePutih, 'UNISEX', 'Neutral'),
  item('Hoodie Ungu Modern', 'HOODIE', 'Rp 559.000', hoodieUngu, 'WANITA', 'Cool'),
  item('Jaket Anti Hujan', 'JAKET', 'Rp 749.000', jaketHujan, 'UNISEX', 'Neutral'),
  item('Jaket Denim Hitam', 'JAKET', 'Rp 699.000', jaketDenimHitam, 'PRIA', 'Neutral'),
  item('Jaket Denim Classic', 'JAKET', 'Rp 679.000', jaketDenim, 'UNISEX', 'Cool'),
  item('Jaket Gelembung Puffer', 'JAKET', 'Rp 899.000', jaketGelembung, 'UNISEX', 'Cool'),
  item('Jaket Gunung Outdoor', 'JAKET', 'Rp 829.000', jaketGunung, 'PRIA', 'Warm'),
  item('Jaket Kulit Classic', 'JAKET', 'Rp 1.099.000', jaketKulit, 'PRIA', 'Neutral'),
  item('Jaket Parasut Ringan', 'JAKET', 'Rp 649.000', jaketParasut, 'UNISEX', 'Neutral'),
  item('Jaket Putih Minimal', 'JAKET', 'Rp 699.000', jaketPutih, 'WANITA', 'Neutral'),
  item('Jaket Smith Navy', 'JAKET', 'Rp 729.000', jaketNavy, 'PRIA', 'Cool'),
  item('Jaket Varsity Hitam Putih', 'JAKET', 'Rp 779.000', jaketVarsity, 'UNISEX', 'Neutral', 'RILIS BARU'),
  item('Kemeja Oxford Putih', 'KEMEJA', 'Rp 489.000', kemejaOxford, 'PRIA', 'Neutral'),
  item('Kemeja Flanel Merah Hitam', 'KEMEJA', 'Rp 529.000', kemejaFlanel, 'PRIA', 'Warm'),
  item('Kemeja Denim Biru Tua', 'KEMEJA', 'Rp 559.000', kemejaDenim, 'PRIA', 'Cool'),
  item('Kemeja Linen Hijau Sage', 'KEMEJA', 'Rp 579.000', kemejaLinen, 'PRIA', 'Warm', 'AI REKOMENDASI'),
  item('Kemeja Garis Pink Putih', 'KEMEJA', 'Rp 499.000', kemejaGaris, 'WANITA', 'Cool'),
  item('Kemeja Satin Beige', 'KEMEJA', 'Rp 649.000', kemejaSatin, 'WANITA', 'Neutral'),
  item('Kemeja Crop Lavender', 'KEMEJA', 'Rp 539.000', kemejaCrop, 'WANITA', 'Cool'),
  item('Kaos Abu', 'KAOS', 'Rp 299.000', kaosAbu, 'UNISEX', 'Neutral'),
  item('Kaos Biru', 'KAOS', 'Rp 299.000', kaosBiru, 'UNISEX', 'Cool'),
  item('Kaos Hijau', 'KAOS', 'Rp 299.000', kaosHijau, 'UNISEX', 'Warm'),
  item('Kaos Hitam', 'KAOS', 'Rp 299.000', kaosHitam, 'UNISEX', 'Neutral'),
  item('Kaos Kuning', 'KAOS', 'Rp 299.000', kaosKuning, 'UNISEX', 'Warm'),
  item('Kaos Merah', 'KAOS', 'Rp 299.000', kaosMerah, 'UNISEX', 'Warm'),
  item('Kaos Oren', 'KAOS', 'Rp 299.000', kaosOren, 'UNISEX', 'Warm'),
  item('Kaos Pink', 'KAOS', 'Rp 299.000', kaosPink, 'UNISEX', 'Cool'),
  item('Kaos Putih', 'KAOS', 'Rp 299.000', kaosPutih, 'UNISEX', 'Neutral'),
  item('Kaos Ungu', 'KAOS', 'Rp 299.000', kaosUngu, 'UNISEX', 'Cool'),
]

const bottomCategories = ['CELANA', 'JEANS', 'BAWAHAN', 'TRAINING', 'JOGGER', 'CARGO']

export const isBottomProduct = (product: Product) =>
  bottomCategories.some((category) => product.category.includes(category))
