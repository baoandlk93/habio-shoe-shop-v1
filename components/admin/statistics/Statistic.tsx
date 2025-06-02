"use client";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);
export default function Statistic() {
  const barData = {
    labels: ["Sản phẩm A", "Sản phẩm B", "Sản phẩm C"],
    datasets: [
      {
        label: "Doanh số (trăm chiếc)",
        data: [30, 45, 20],
        backgroundColor: "rgba(59, 130, 246, 0.6)",
      },
    ],
  };

  const pieData = {
    labels: ["Đã xử lý", "Chưa xử lý"],
    datasets: [
      {
        data: [120, 45],
        backgroundColor: [
          "rgba(34,197,94,0.7)", // Màu xanh xử lý
          "rgba(239,68,68,0.7)", // Màu đỏ chưa xử lý
        ],
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Doanh số sản phẩm</h2>
        <Bar data={barData} />
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Tình trạng đơn hàng</h2>
        <Pie data={pieData} />
      </div>
      {/* Thêm các biểu đồ khác tùy ý */}
    </div>
  );
}
