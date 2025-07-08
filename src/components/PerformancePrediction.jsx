import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PerformaPrediction = () => {
  const [input, setInput] = useState({
    nilai_mtk: "",
    nilai_ipa: "",
    jam_belajar: "",
    klik_video: "",
  });

  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const validateInput = () => {
    for (const [key, value] of Object.entries(input)) {
      if (value === "" || isNaN(value)) {
        return `Field "${key}" harus berupa angka dan tidak boleh kosong`;
      }
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateInput();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setError("");
      const response = await fetch("http://localhost:8000/prediksi-performa/performa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...input,
          nilai_mtk: parseFloat(input.nilai_mtk),
          nilai_ipa: parseFloat(input.nilai_ipa),
          jam_belajar: parseFloat(input.jam_belajar),
          klik_video: parseInt(input.klik_video),
        }),
      });

      const data = await response.json();
      setResult(data.hasil_prediksi);
    } catch (err) {
      setError("Gagal menghubungi server.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-xl space-y-6">
      <h2 className="text-xl font-bold text-center text-gray-700">Prediksi Performa Akademik</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["nilai_mtk", "nilai_ipa", "jam_belajar", "klik_video"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.replace("_", " ").toUpperCase()}
            value={input[field]}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ))}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Prediksi
        </button>
      </form>

      <AnimatePresence>
        {result !== null && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center mt-4 p-4 border rounded-xl bg-green-100 text-green-800 font-semibold"
          >
            Hasil Prediksi Performa: {result.toFixed(2)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PerformaPrediction;
