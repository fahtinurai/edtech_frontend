import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Brain, Compass, BarChart, AlertTriangle, Layers } from "lucide-react";


const features = [
  {
    title: "Rekomendasi Materi",
    icon: <BookOpen size={32} />,
    path: "/materi",
    color: "bg-gradient-to-r from-blue-400 to-blue-600",
  },
  {
    title: "Rekomendasi Metode Belajar",
    icon: <Layers size={32} />,
    path: "/rekomendasi-metode",
    color: "bg-gradient-to-r from-green-400 to-green-600",
  },
  {
    title: "Prediksi Performa",
    icon: <BarChart size={32} />,
    path: "/prediksi-performa",
    color: "bg-gradient-to-r from-purple-400 to-purple-600",
  },
  {
    title: "Segmentasi Gaya Belajar",
    icon: <Brain size={32} />,
    path: "/segmentasi",
    color: "bg-gradient-to-r from-pink-400 to-pink-600",
  },
  {
    title: "Notifikasi Anomali",
    icon: <AlertTriangle size={32} />,
    path: "/anomali",
    color: "bg-gradient-to-r from-red-400 to-red-600",
  },
  {
    title: "Adaptasi Jalur Belajar",
    icon: <Compass size={32} />,
    path: "/jalur",
    color: "bg-gradient-to-r from-yellow-400 to-yellow-600",
  },
];

const Dashboard = () => {
  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
        🎓 Sistem Edukasi Personalisasi
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Link
            to={feature.path}
            key={index}
            className={`rounded-xl p-6 text-white shadow-lg transform transition hover:scale-105 ${feature.color}`}
          >
            <div className="flex items-center space-x-4">
              <div>{feature.icon}</div>
              <div className="text-lg font-semibold">{feature.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
