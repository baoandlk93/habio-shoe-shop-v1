"use client";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);
export default function Statistic() {
  const barData = {
    labels: ["Nike", "Adidas", "Puma", "Vans", "New Balance"],
    datasets: [
      {
        label: "Doanh số (trăm chiếc)",
        data: [30, 45, 20, 15, 25],
        backgroundColor: "rgba(59, 130, 246, 0.6)",
      },
    ],
  };

  const pieData = {
    labels: ["  Đã xử lý", "Chưa xử lý"],
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

  const lineData = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
    datasets: [
      {
        label: "Doanh thu (triệu đồng)",
        data: [120, 150, 180, 210, 240, 270],
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Doanh số sản phẩm</h2>
        <Bar data={barData} />
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Tình trạng đơn hàng</h2>
        <Pie data={pieData} />
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Doanh thu</h2>
        <Line data={lineData} />
      </div>
    </div>
  );
}
