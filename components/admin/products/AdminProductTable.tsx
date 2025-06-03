"use client";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Product } from "@/server/entity";
import { useState, useEffect } from "react";
export default function AdminProductTable({
  onFetching,
  onEdit,
  onDelete,
}: {
  onFetching: boolean;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const itemsPerPage = 10;

  // Load sản phẩm ban đầu
  const fetchProducts = async () => {
    const res = await fetch("/api/admin/products", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setProducts(data);
    setTotalProducts(data.length);
  };
  useEffect(() => {
    fetchProducts();
  }, [currentPage]);
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [onFetching]);
  return (
    <div className="flex-1 overflow-y-auto overflow-x-auto h-full max-h-[calc(100vh-64px)] bg-white p-6 rounded-xl shadow-xl w-full">
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Tìm theo tên sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>
      <table className="min-w-full text-sm rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-gradient-to-r from-blue-100 to-indigo-100 text-gray-700 text-[16px] font-semibold">
            <th className="py-3 px-4 text-center">STT</th>
            <th className="py-3 px-4 text-center">Tên</th>
            <th className="py-3 px-4 text-center">Giá</th>
            <th className="py-3 px-4 text-center">Hình</th>
            <th className="py-3 px-4 text-center">Loại</th>
            <th className="py-3 px-4 text-center"></th>
          </tr>
        </thead>
        <tbody>
          {products !== null && products.length > 0 ? (
            products.map((product, index) => (
              <tr
                key={index}
                className="transition-colors hover:bg-blue-50 border-b"
              >
                <td className="py-3 px-4 text-center">{index + 1}</td>
                <td className="py-3 px-4 text-center">{product.name}</td>
                <td className="py-3 px-4 text-center font-medium text-blue-600">
                  {product.price.toLocaleString("vi-VN")}₫
                </td>
                <td className="py-3 px-4 flex justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-10 w-10 object-cover rounded shadow"
                  />
                </td>
                <td className="py-3 px-4 text-center">{product.category}</td>
                <td className="py-3 px-4 flex gap-2 justify-center">
                  <button
                    title="Sửa"
                    onClick={() => onEdit(product)}
                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg shadow transition-all"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    title="Xóa"
                    onClick={() => onDelete(product)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow transition-all"
                  >
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="py-8 text-center text-gray-400">
                Không có sản phẩm nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-between gap-2 items-center mt-4">
        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-blue-200 disabled:opacity-50"
          >
            Trang trước
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-blue-200 disabled:opacity-50"
          >
            Trang sau
          </button>
        </div>
        <span className="text-sm text-gray-500">
          Trang {currentPage} / {totalPages}
        </span>
      </div>
    </div>
  );
}
