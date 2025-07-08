// components/MethodRecommendation.jsx
import React, { useState } from "react";

const MethodRecommendation = () => {
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
      const res = await fetch("http://localhost:8000/rekomendasi-metode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nilai_mtk: parseFloat(form.nilai_mtk),
          nilai_ipa: parseFloat(form.nilai_ipa),
          jam_belajar: parseFloat(form.jam_belajar),
          klik_video: parseInt(form.klik_video),
        }),
      });

      const data = await res.json();
      setHasil(data.hasil_metode);
    } catch (err) {
      setHasil("❌ Gagal mendapatkan rekomendasi metode.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">📚 Rekomendasi Metode Belajar</h2>
      <form onSubmit={handleSubmit} className="space-y-4 pb-8">
        {["nilai_mtk", "nilai_ipa", "jam_belajar", "klik_video"].map((field) => (
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
              step="any"
              required
            />
          </div>
        ))}

        <div className="pt-2 text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {loading ? "Memproses..." : "Dapatkan Rekomendasi Metode"}
          </button>
        </div>
      </form>

      {hasil && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
          🧠 <strong>Rekomendasi Metode</strong> {hasil}
        </div>
      )}
    </div>
  );
};


export default MethodRecommendation;
