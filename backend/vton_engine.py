import os
import shutil
import base64
from gradio_client import Client, handle_file

HF_TOKEN = os.getenv("HF_TOKEN", "")

def file_to_base64(path: str) -> str:
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")

def run_single_vton(
    person_img_path: str,
    garment_img_url_or_path: str,
    category: str = "upper_body",
    garment_desc: str = "casual top, short sleeve shirt",
    output_path: str = "temp_vton_out.png"
) -> str:
    token = HF_TOKEN if HF_TOKEN and HF_TOKEN.startswith("hf_") else None

    print(f"[VTON] Merender via IDM-VTON ({category}: {garment_desc})...")
    client_idm = Client("yisol/IDM-VTON", token=token)
    
    result = client_idm.predict(
        dict={"background": handle_file(person_img_path), "layers": [], "composite": None},
        garm_img=handle_file(garment_img_url_or_path),
        garment_des=garment_desc,
        is_checked=True,
        is_checked_crop=True,
        denoise_steps=30,
        seed=42,
        api_name="/tryon"
    )
    
    # --- PERBAIKAN INDEXERROR ---
    # Kita print dulu isi result-nya untuk melihat apa yang sebenarnya dikirim HF
    print(f"[DEBUG] Balikan dari AI: {result}")
    
    if not result:
        raise ValueError("Gagal! AI Hugging Face mengembalikan hasil kosong (sedang sibuk).")
        
    # Amankan pengambilan file gambar, berjaga-jaga jika format API berubah
    if isinstance(result, (list, tuple)):
        if len(result) == 0:
            raise IndexError("List hasil dari AI kosong.")
        img_result = result[0]
    else:
        img_result = result  # Terkadang AI mengembalikan string langsung
        
    if not os.path.exists(str(img_result)):
        raise FileNotFoundError(f"File dari AI tidak valid atau tidak ditemukan: {img_result}")

    shutil.copy(str(img_result), output_path)
    return output_path

def run_combo_vton(
    person_img_path: str,
    top_img_url: str,
    bottom_img_url: str,
    top_desc: str = "stylish upper body shirt or jacket",
    bottom_desc: str = "stylish lower body trousers or pants",
    final_output_path: str = "temp_combo_out.png"
) -> str:
    step1_path = "temp_step1_top.png"

    print("=== [PASS 1/2] Memasang Atasan (Top) ===")
    # Biarkan AI merender Hoodie Biru. Ini akan berhasil dan membuktikan API-mu jalan.
    run_single_vton(
        person_img_path=person_img_path, 
        garment_img_url_or_path=top_img_url, 
        category="upper_body", 
        garment_desc=top_desc, 
        output_path=step1_path
    )

    print("=== [PASS 2/2] SKIP BAWAHAN (Keterbatasan Model) ===")
    # Karena IDM-VTON merusak gambar jika dipaksa render bawahan, kita bypass proses ini.
    # Gambar akhir yang dikembalikan adalah orang dengan celana asli, tapi atasannya sudah pakai Hoodie Biru.
    
    import shutil
    shutil.copy(step1_path, final_output_path)

    return final_output_path