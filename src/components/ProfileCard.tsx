import { Icon } from "./Icon";

type ProfileCardProps = {
  onEdit: () => void;
  gender: string;
  skinTone: string;
  height?: string;
  weight?: string;
  bmi?: string | number;
  bodyShape?: string;
};

export function ProfileCard({
  onEdit,
  gender,
  skinTone,
  height = "175",
  weight = "72",
  bmi = "23.5",
  bodyShape = "Mesomorph (Atletis)",
}: ProfileCardProps) {
  // Mengambil kata pertama dari bentuk tubuh (misal: "Mesomorph")
  const shortPosture = bodyShape.split(" ")[0];

  return (
    <section className="profile-card">
      <div className="profile-card-top">
        <div className="profile-person">
          <div className="profile-photo">
            <img src="/images/futura-example.jpg" alt="Alex Mercer" />
            <i>
              <Icon name="check" size={11} />
            </i>
          </div>
          <div>
            <strong>Novalino</strong>
            <span>
              <Icon name="check" size={11} /> Profil Ukuran Terverifikasi
            </span>
          </div>
        </div>
        <button className="edit-profile" onClick={onEdit}>
          <Icon name="layers" size={13} /> Ubah
        </button>
      </div>
      <div className="profile-metrics">
        <div>
          <small>TINGGI</small>
          <strong>
            {height} <em>cm</em>
          </strong>
        </div>
        <div>
          <small>BERAT</small>
          <strong>
            {weight} <em>kg</em>
          </strong>
        </div>
        <div>
          <small>BMI</small>
          <strong>{bmi}</strong>
        </div>
        <div>
          <small>
            BENTUK
            <br />
            TUBUH
          </small>
          <strong>{shortPosture}</strong>
        </div>
      </div>
      <div className="profile-gender">
        <small>JENIS KELAMIN</small>
        <strong>{gender}</strong>
      </div>
      <div className="profile-gender">
        <small>TONE WARNA KULIT</small>
        <strong>{skinTone}</strong>
      </div>
    </section>
  );
}
