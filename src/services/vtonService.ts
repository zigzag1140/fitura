const API_BASE_URL = "http://127.0.0.1:8000";

export async function analyzeSingleVton(
  personFile: File,
  garmentUrl: string,
  category: string,
  garmentDesc: string,
) {
  const formData = new FormData();
  formData.append("file", personFile);
  formData.append("garment_url", garmentUrl);
  formData.append("category", category);
  formData.append("garment_desc", garmentDesc);

  const res = await fetch(`${API_BASE_URL}/api/vton/single`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("VTON Single gagal diproses");
  return await res.json();
}

export async function analyzeComboVton(
  personFile: File,
  topUrl: string,
  bottomUrl: string,
  topName: string,
  bottomName: string,
) {
  const formData = new FormData();
  formData.append("file", personFile);
  formData.append("top_url", topUrl);
  formData.append("bottom_url", bottomUrl);
  formData.append("top_name", topName);
  formData.append("bottom_name", bottomName);

  const res = await fetch(`${API_BASE_URL}/api/vton/combo`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("VTON Combo gagal diproses");
  return await res.json();
}

export async function analyzeSkinTone(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE_URL}/api/skin-tone`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Gagal memproses Skin Tone");
  }

  return await res.json();
}

export async function analyzeSmartSizing(
  height: string,
  weight: string,
  gender: string,
) {
  const formData = new FormData();
  formData.append("tb_cm", height);
  formData.append("bb_kg", weight);
  formData.append("gender", gender);

  const res = await fetch(`${API_BASE_URL}/api/smart-sizing`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Smart Sizing gagal diproses");
  return await res.json();
}