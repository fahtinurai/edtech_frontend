import React from "react";
import { Routes, Route, Link } from "react-router-dom";

// Import halaman dan komponen fitur
import Dashboard from "./pages/Dashboard";
import MateriRecommendation from "./components/MateriRecommendation";
import MethodRecommendation from "./components/MethodRecommendation";
import PerformancePrediction from "./components/PerformancePrediction";
import LearningStyleSegment from "./components/LearningStyleSegment";
import AnomalyNotification from "./components/AnomalyNotification";
import LearningPathAdaptation from "./components/LearningPathAdaptation";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Navbar sederhana */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">📚 EdTech System</h1>
        <Link
          to="/"
          className="text-blue-500 hover:underline font-medium"
        >
          Dashboard
        </Link>
      </nav>

      <main className="p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/materi" element={<MateriRecommendation />} />
          <Route path="/rekomendasi-metode" element={<MethodRecommendation />} />
          <Route path="/prediksi-performa" element={<PerformancePrediction />} />
          <Route path="/segmentasi" element={<LearningStyleSegment />} />
          <Route path="/anomali" element={<AnomalyNotification />} />
          <Route path="/jalur" element={<LearningPathAdaptation />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
