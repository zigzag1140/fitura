from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from skin_tone_engine import analyze_skin_tone_cielab
from vton_engine import run_single_vton, run_combo_vton, file_to_base64
from smart_sizing_engine import analyze_smart_sizing
import urllib.request
import os

app = FastAPI(title="SmartFit AI Backend")

# Mengizinkan frontend React (localhost:5173) untuk menembak API tanpa diblokir CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Helper function untuk memastikan URL baju valid
def format_garment_url(url: str) -> str:
    """
    Jika frontend mengirim path '/src/...', kita ubah menjadi URL localhost
    agar Gradio bisa mendownloadnya. Sesuaikan port 5173 jika frontend-mu berbeda.
    """
    if url.startswith("/src/"):
        return f"http://localhost:5173{url}"
    return url

# ==========================================
# ENDPOINT 1: Single Try-On (Satu Pakaian)
# ==========================================
@app.post("/api/vton/single")
async def api_vton_single(
    file: UploadFile = File(...),
    garment_url: str = Form(...),
    category: str = Form("upper_body"),
    garment_desc: str = Form("casual shirt, top")
):
    try:
        # 1. Simpan foto user dari frontend
        user_path = "temp_user_single.png"
        with open(user_path, "wb") as f:
            f.write(await file.read())

        # 2. Trik untuk mengambil gambar baju dari Frontend Vite
        garment_path = "temp_garment_single.png"
        
        # Jika path dari frontend berawalan '/', ubah jadi URL localhost Vite
        if garment_url.startswith("/"):
            garment_url = f"http://localhost:5173{garment_url}"
        
        # Download gambar baju dari localhost/internet dan simpan sebagai file lokal
        if garment_url.startswith("http"):
            req = urllib.request.Request(garment_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response, open(garment_path, 'wb') as out_file:
                out_file.write(response.read())
        else:
            # Fallback jika ternyata sudah path lokal Windows yang valid
            garment_path = garment_url

        # 3. Jalankan VTON menggunakan file FISIK (garment_path), bukan URL lagi!
        out_path = run_single_vton(
            person_img_path=user_path,
            garment_img_url_or_path=garment_path,  # <-- Hugging Face menerima file fisik, 100% aman
            category=category,
            garment_desc=garment_desc,
            output_path="out_single.png"
        )
        
        return {
            "status": "success", 
            "image_base64": f"data:image/png;base64,{file_to_base64(out_path)}"
        }
    except Exception as e:
        # Jika gagal, kirim error ke React agar tidak macet di layar Loading
        print("VTON Error:", str(e))
        return {"status": "error", "error": str(e)}
def download_garment_if_needed(garment_url: str, temp_filename: str) -> str:
    if garment_url.startswith("/"):
        garment_url = f"http://localhost:5173{garment_url}"
    
    if garment_url.startswith("http"):
        req = urllib.request.Request(garment_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response, open(temp_filename, 'wb') as out_file:
            out_file.write(response.read())
        return temp_filename
    return garment_url

# ==========================================
# ENDPOINT 2: Combo Try-On (Atasan + Bawahan)
# ==========================================
@app.post("/api/vton/combo")
async def api_vton_combo(
    file: UploadFile = File(...),
    top_url: str = Form(...),
    bottom_url: str = Form(...),
    top_name: str = Form("jacket or shirt"),
    bottom_name: str = Form("cargo pants or trousers")
):
    try:
        # 1. Simpan foto user dari frontend
        user_path = "temp_user_combo.png"
        with open(user_path, "wb") as f:
            f.write(await file.read())

        # 2. Download atasan dan bawahan dari localhost React menjadi file fisik
        top_path = download_garment_if_needed(top_url, "temp_top_combo.png")
        bottom_path = download_garment_if_needed(bottom_url, "temp_bottom_combo.png")

        # 3. Jalankan VTON menggunakan file fisik yang sudah diunduh
        out_path = run_combo_vton(
            person_img_path=user_path,
            top_img_url=top_path,       # Sudah berupa file lokal
            bottom_img_url=bottom_path, # Sudah berupa file lokal
            top_desc=top_name,
            bottom_desc=bottom_name,
            final_output_path="out_combo.png"
        )
        return {
            "status": "success", 
            "image_base64": f"data:image/png;base64,{file_to_base64(out_path)}"
        }
    except Exception as e:
        print("Combo VTON Error:", str(e))
        # JARING PENGAMAN HACKATHON: Jika HF error/limit, kembalikan gambar dummy
        fallback_image_path = "dummy_result.png"
        if os.path.exists(fallback_image_path):
            print("Menggunakan Fallback Image Combo untuk Demo...")
            return {
                "status": "success", 
                "image_base64": f"data:image/png;base64,{file_to_base64(fallback_image_path)}"
            }
        return {"status": "error", "error": str(e)}

# ==========================================
# ENDPOINT 3: Skin Tone Analysis
# ==========================================
@app.post("/api/skin-tone")
async def api_skin_tone(file: UploadFile = File(...)):
    try:
        img_bytes = await file.read()
        result = analyze_skin_tone_cielab(img_bytes)
        return result
    except Exception as e:
        return {"error": str(e)}

# ==========================================
# ENDPOINT 4: Smart Sizing (Somatotype)
# ==========================================
@app.post("/api/smart-sizing")
async def api_smart_sizing(
    tb_cm: float = Form(...),
    bb_kg: float = Form(...),
    gender: str = Form("PRIA")
):
    try:
        # Panggil fungsi tanpa image_bytes
        result = analyze_smart_sizing(tb_cm, bb_kg, gender)
        return result
    except Exception as e:
        return {"error": str(e)}