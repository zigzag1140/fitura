import math
import traceback

def analyze_smart_sizing(tb_cm: float, bb_kg: float, gender: str = "PRIA") -> dict:
    """
    Kalkulasi ukuran dan Somatotype murni dari Tinggi, Berat, dan Gender.
    """
    # 1. Hitung BMI Dasar
    bmi = bb_kg / ((tb_cm / 100.0) ** 2)
    
    # 2. Penentuan Ukuran Pakaian (Bisa dibedakan antara pria/wanita jika perlu)
    if bb_kg < 55 and tb_cm < 168:
        base_size = "S"
    elif bb_kg < 68 and tb_cm < 175:
        base_size = "M"
    elif bb_kg < 82 and tb_cm < 182:
        base_size = "L"
    elif bb_kg < 95:
        base_size = "XL"
    else:
        base_size = "XXL"

    # Penyesuaian kecil untuk wanita (biasanya cutting lebih kecil)
    if gender.upper() == "WANITA" and base_size != "S":
        # Logika opsional: turunkan 1 size untuk wanita jika pakai standar unisex
        pass 

    # 3. Klasifikasi somatotype
    if bmi < 18.5:
        body_shape = "Ectomorph (Ramping)"
    elif bmi > 25.0:
        body_shape = "Endomorph (Berisi/Lebar)"
    else:
        body_shape = "Mesomorph (Atletis/Proporsional)"

    return {
        "bmi": round(bmi, 1),
        "bodyShape": body_shape,
        "shoulderHipRatio": 1.0, # Tetap dikirim agar frontend React tidak error
        "recommendedSize": base_size
    }