import { Icon } from "./Icon";

type SkinToneResultProps = {
  data?: any;
};

export function SkinToneResult({ data }: SkinToneResultProps) {
  const skinTone = data?.skinTone || "Medium / Kuning Langsat";
  const undertone = data?.undertone || "Warm";
  const itaScore = data?.itaScore || "N/A";

  // Tangkap warna asli kulit dari Python
  const detectedSkinHex = data?.skinColorHex || "#D4A373";
  const paletteColors = data?.recommendedColors || [
    "#C04000",
    "#A1C0AD",
    "#B8860B",
  ];

  let avoidHeadingText =
    "Warna dingin bersaturasi pucat cenderung membuat rona kulit hangat Anda terlihat kusam atau lelah.";
  let avoidList = [
    { name: "Icy Blue", hex: "#D0E7FF", reason: "Terlalu Dingin" },
    { name: "Pale Silver Gray", hex: "#E1E3E8", reason: "Pudar Spektrum" },
  ];

  if (data?.recommendedTag === "Cool") {
    avoidHeadingText =
      "Warna bernuansa terlalu hangat atau kekuningan dapat membuat kulit Cool Anda tampak kemerahan atau kusam.";
    avoidList = [
      { name: "Mustard Yellow", hex: "#FFDB58", reason: "Terlalu Kuning" },
      { name: "Brick Red", hex: "#CB4154", reason: "Terlalu Hangat" },
    ];
  } else if (data?.recommendedTag === "Netral") {
    avoidHeadingText =
      "Hindari warna-warna neon yang terlalu mencolok karena dapat menenggelamkan keseimbangan kulit netral Anda.";
    avoidList = [
      { name: "Neon Green", hex: "#39FF14", reason: "Terlalu Mencolok" },
      { name: "Hot Pink", hex: "#FF69B4", reason: "Menenggelamkan Rona" },
    ];
  }

  return (
    <>
      <section className="tone-result-card">
        <div className="tone-result-heading">
          <div>
            <Icon name="sparkles" size={17} />
            <strong>Hasil Analisa Warna</strong>
          </div>
          <span>Skor ITA: {itaScore}</span>
        </div>
        <div className="tone-result-main">
          {/* Warna lingkaran kini akurat dengan kulit pengguna */}
          <div
            className="tone-swatch"
            style={{ background: detectedSkinHex }}
          />
          <div>
            <span className="tone-label">WARNA KULIT TERDETEKSI</span>
            <strong>
              {undertone} {skinTone.split(" / ")[0]}
            </strong>
            <small>
              Hex {detectedSkinHex} · Spektrum {undertone}
            </small>
          </div>
        </div>
        <div className="tone-palette">
          {paletteColors.slice(0, 3).map((hex: string, index: number) => (
            <div key={index}>
              <i style={{ background: hex }} />
              <span>
                Palet {index + 1}
                <small>{hex}</small>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="avoid-colors-card">
        <div className="avoid-heading">
          <Icon name="close" size={17} />
          <strong>Warna yang Sebaiknya Dihindari</strong>
        </div>
        <p>{avoidHeadingText}</p>
        <div className="avoid-colors">
          {avoidList.map((item, index) => (
            <div key={index}>
              <i style={{ background: item.hex }} />
              <span>
                {item.name}
                <small>{item.reason}</small>
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
