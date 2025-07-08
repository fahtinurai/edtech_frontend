import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LearningPathAdaptation = () => {
  const [formData, setFormData] = useState({
    nilai_mtk: "",
    nilai_ipa: "",
    jam_belajar: "",
    klik_video: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    for (let key in formData) {
      if (formData[key] === "" || isNaN(formData[key])) {
        return `Field "${key}" harus diisi dengan angka.`;
      }
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");

    try {
      const response = await fetch("http://localhost:8000/adaptasi-jalur/adaptasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nilai_mtk: parseFloat(formData.nilai_mtk),
          nilai_ipa: parseFloat(formData.nilai_ipa),
          jam_belajar: parseFloat(formData.jam_belajar),
          klik_video: parseInt(formData.klik_video),
        }),
      });

      const data = await response.json();
      setResult(data.hasil_jalur);
    } catch (err) {
      setError("Gagal mengirim data. Pastikan backend berjalan.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-xl space-y-6">
      <h2 className="text-xl font-bold text-center text-gray-700">Adaptasi Jalur Belajar</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["nilai_mtk", "nilai_ipa", "jam_belajar", "klik_video"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.replace("_", " ").toUpperCase()}
            value={formData[field]}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ))}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Prediksi Jalur Belajar
        </button>
      </form>

      <AnimatePresence>
        {result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center mt-4 p-4 border rounded-xl bg-green-100 text-green-800 font-semibold"
          >
            Jalur Belajar yang Direkomendasikan: {result}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LearningPathAdaptation;
