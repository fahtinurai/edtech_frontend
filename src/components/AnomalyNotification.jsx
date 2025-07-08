import React, { useState } from "react";

const AnomalyNotification = () => {
  const [form, setForm] = useState({
    nilai_mtk: "",
    nilai_ipa: "",
    jam_belajar: "",
    klik_video: "",
  });
  const [hasil, setHasil] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setHasil("");

    try {
      const res = await fetch("http://localhost:8000/AnomalyNotification/anomali", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nilai_mtk: parseFloat(form.nilai_mtk),
          nilai_ipa: parseFloat(form.nilai_ipa),
          jam_belajar: parseFloat(form.jam_belajar),
          klik_video: parseInt(form.klik_video),
        }),
      });

      if (!res.ok) throw new Error("Gagal mendapatkan response dari server");

      const data = await res.json();
      setHasil(data.hasil_anomali);
    } catch (err) {
      setHasil("❌ Gagal mendeteksi anomali.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        🚨 Notifikasi Anomali Belajar
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["nilai_mtk", "nilai_ipa", "jam_belajar", "klik_video"].map(
          (field) => (
            <div key={field}>
              <label className="block font-medium capitalize">
                {field.replace("_", " ")}
              </label>
              <input
                type="number"
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
                step="any"
              />
            </div>
          )
        )}
        <div className="pt-2">
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {loading ? "Memproses..." : "Deteksi Anomali"}
          </button>
        </div>
      </form>
      {hasil && (
        <div className="mt-4 p-4 bg-yellow-100 text-yellow-800 rounded">
          {hasil}
        </div>
      )}
    </div>
  );
};

export default AnomalyNotification;