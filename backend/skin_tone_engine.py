import cv2
import numpy as np
import math
import os
import urllib.request

# 1. Otomatis download file XML model wajah jika belum ada di folder backend
cascade_path = "haarcascade_frontalface_default.xml"
if not os.path.exists(cascade_path):
    print("Mendownload model deteksi wajah OpenCV...")
    url = "https://raw.githubusercontent.com/opencv/opencv/master/data/haarcascades/haarcascade_frontalface_default.xml"
    urllib.request.urlretrieve(url, cascade_path)

# 2. Load AI Pendeteksi Wajah dari file lokal yang sudah didownload
face_cascade = cv2.CascadeClassifier(cascade_path)

def analyze_skin_tone_cielab(image_bytes: bytes) -> dict:
# ... (Biarkan fungsi ke bawahnya tetap sama persis) ...
    """
    Mendeteksi wajah dengan OpenCV, mengekstrak area pipi, 
    dan menghitung skor warna kulit (ITA) di ruang CIELAB.
    """
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    if img is None:
        raise ValueError("Gambar tidak terbaca.")

    # Konversi ke Grayscale khusus untuk deteksi wajah
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
    
    h_img, w_img, _ = img.shape
    skin_pixels = []
    
    # Jika wajah terdeteksi, ambil sampel presisi dari area pipi kiri & kanan
    if len(faces) > 0:
        x, y, w, h = faces[0]
        
        # Titik potong pipi kiri (sekitar 20%-35% dari lebar wajah, agak ke bawah)
        patch_left = img[y + int(h*0.55):y + int(h*0.65), x + int(w*0.2):x + int(w*0.35)]
        # Titik potong pipi kanan (sekitar 65%-80% dari lebar wajah)
        patch_right = img[y + int(h*0.55):y + int(h*0.65), x + int(w*0.65):x + int(w*0.8)]
        
        if patch_left.size > 0:
            skin_pixels.extend(patch_left.reshape(-1, 3))
        if patch_right.size > 0:
            skin_pixels.extend(patch_right.reshape(-1, 3))
            
    # Fallback (Jika foto buram / wajah tidak terdeteksi, ambil titik tengah foto)
    if len(skin_pixels) == 0:
        patch = img[h_img//2-20:h_img//2+20, w_img//2-20:w_img//2+20]
        skin_pixels = patch.reshape(-1, 3)
        
    skin_pixels = np.array(skin_pixels, dtype=np.uint8)
    
    # Konversi matriks BGR ke CIELAB
    skin_pixels_2d = skin_pixels.reshape(1, -1, 3)
    lab_pixels = cv2.cvtColor(skin_pixels_2d, cv2.COLOR_BGR2LAB)[0]
    
    mean_l, mean_a, mean_b = np.mean(lab_pixels, axis=0)
    
    # Normalisasi untuk rumus Individual Typology Angle (ITA)
    true_L = (mean_l * 100.0) / 255.0
    true_b = mean_b - 128.0
    if true_b == 0: true_b = 0.001
        
    ita = math.atan2((true_L - 50.0), true_b) * (180.0 / math.pi)
    
    # Klasifikasi Warna Kulit
    if ita > 41:
        skin_tone = "Light / Terang"
        undertone = "Cool" if true_b < 10 else "Neutral"
        rec_tag = "Cool" if true_b < 10 else "Netral"
        rec_colors = ["#1B365D", "#2E5A44", "#8B2635", "#7D8B91"]
    elif ita > 28:
        skin_tone = "Medium / Kuning Langsat"
        undertone = "Warm" if true_b > 12 else "Neutral"
        rec_tag = "Warm"
        rec_colors = ["#556B2F", "#C19A6B", "#FFFDD0", "#800020"]
    elif ita > 10:
        skin_tone = "Tan / Sawo Matang"
        undertone = "Warm"
        rec_tag = "Warm"
        rec_colors = ["#8B6F5C", "#F5F5DC", "#FFBF00", "#4682B4"]
    else:
        skin_tone = "Deep / Gelap"
        undertone = "Cool" if true_b < 10 else "Warm"
        rec_tag = "Netral"
        rec_colors = ["#F5F5DC", "#FFBF00", "#4682B4", "#E2725B"]
        
# --- TAMBAHKAN 2 BARIS INI UNTUK MENDAPATKAN WARNA ASLI KULIT ---
    mean_bgr = np.mean(skin_pixels, axis=0)
    skin_hex = "#{:02x}{:02x}{:02x}".format(int(mean_bgr[2]), int(mean_bgr[1]), int(mean_bgr[0]))

    # --- TAMBAHKAN "skinColorHex" KE DALAM RETURN ---
    return {
        "skinTone": skin_tone,
        "undertone": undertone,
        "itaScore": round(ita, 1),
        "recommendedColors": rec_colors,
        "recommendedTag": rec_tag,
        "skinColorHex": skin_hex 
    }