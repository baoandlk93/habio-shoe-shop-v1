"use client";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IProduct } from "@/server/entity";
import { useState, useEffect } from "react";
import { supabaseClient } from "@/lib/supabase/client";
export default function AdminProductTable({
  onFetching,
  onEdit,
  onDelete,
}: {
  onFetching: boolean;
  onEdit: (product: IProduct) => void;
  onDelete: (product: IProduct) => void;
}) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const itemsPerPage = 10;
  const [category, setCategory] = useState("");

  // Load sản phẩm ban đầu
  const fetchProducts = async () => {
    const from = (currentPage - 1) * itemsPerPage;
    const to = currentPage * itemsPerPage - 1;
    const res = await fetch(
      "/api/admin/products?from=" +
        from +
        "&to=" +
        to +
        "&category=" +
        category +
        "&name=" +
        searchTerm,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await res.json();
    setProducts(data);
  };
  // Lấy tổng số sản phẩm để tính tổng số trang
  useEffect(() => {
    const fetchTotalCount = async () => {
      const { count } = await supabaseClient
        .from("product")
        .select("*", { count: "exact", head: true });
      setTotalProducts(count || 0);
    };
    fetchTotalCount();
  }, []);
  useEffect(() => {
    fetchProducts();
  }, [currentPage]);
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [onFetching]);
  return (
    <div className="flex-1 overflow-hidden h-full max-h-screen bg-white rounded-xl shadow-xl w-full">
      <div className="flex flex-col items-start sticky top-0 z-10">
        <div className="w-full flex gap-2">
          <div className="flex items-center justify-center align-center h-full">
            <input
              type="text"
              placeholder="Tìm theo tên sản phẩm..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // reset về trang 1 khi tìm kiếm
              }}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 "
            />
          </div>
          <div className="flex items-center justify-center align-center h-full">
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 "
            >
              <option value="">Tất cả loại</option>
              <option value="Điện tử">Điện tử</option>
              <option value="Thời trang">Thời trang</option>
              <option value="Đồ gia dụng">Đồ gia dụng</option>
              {/* ...thêm các loại nếu cần */}
            </select>
          </div>
          <div className="flex items-center justify-center align-center h-full">
            <button
              onClick={() => {
                setCurrentPage(1);
                fetchProducts();
              }}
              className="w-full px-4 py-2 border rounded-xl bg-blue-500 hover:bg-blue-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-200 "
            >
              Tìm kiếm
            </button>
          </div>
        </div>
        <div className="flex justify-between gap-3 items-center my-1">
          <div className="flex gap-2  justify-center my-4">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-2 py-1 border rounded"
            >
              Đầu
            </button>
            <button
              onClick={() => setCurrentPage((c) => Math.max(1, c - 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 border rounded"
            >
              Trước
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .slice(
                Math.max(0, currentPage - 3),
                Math.min(totalPages, currentPage + 2)
              )
              .map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-2 py-1 border rounded ${
                    pageNum === currentPage ? "bg-blue-400 text-white" : ""
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            <button
              onClick={() => setCurrentPage((c) => Math.min(totalPages, c + 1))}
              disabled={currentPage === totalPages}
              className="px-2 py-1 border rounded"
            >
              Sau
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 border rounded"
            >
              Cuối
            </button>
          </div>
          <div className="flex items-center justify-center align-center h-full">
            <span className="text-sm text-gray-500">
              Trang {currentPage} / {totalPages}
            </span>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto h-full max-h-screen bg-white rounded-xl shadow-xl w-full">
        <table className=" min-w-full h-[calc(100vh-200px)] text-sm rounded-xl">
          <thead className="sticky top-0 z-10 bg-white ">
            <tr className="bg-gradient-to-r from-blue-100 to-indigo-100 text-gray-700 text-[16px] font-semibold rounded-t-xl">
              <th className="py-1 px-4 text-center">STT</th>
              <th className="py-1 px-4 text-center">Tên</th>
              <th className="py-1 px-4 text-center">Giá</th>
              <th className="py-1 px-4 text-center">Hình</th>
              <th className="py-1 px-4 text-center">Danh mục</th>
              <th className="py-1 px-4 text-center"></th>
            </tr>
          </thead>
          <tbody className="">
            {products !== null && products.length > 0 ? (
              products.map((product, index) => (
                <tr
                  key={index}
                  className="transition-colors hover:bg-blue-50 border-b"
                >
                  <td className="py-1 px-4 text-center">{index + 1}</td>
                  <td className="py-1 px-4 text-center">{product.name}</td>
                  <td className="py-1 px-4 text-center font-medium text-blue-600">
                    {product.price.toLocaleString("vi-VN")}k₫
                  </td>
                  <td className="py-1 px-4 flex justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-12 w-12 object-cover rounded shadow"
                    />
                  </td>
                  <td className="py-1 px-4 text-center">{product.category}</td>
                  <td className="py-1 px-4 flex gap-2 justify-center">
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
      </div>
    </div>
  );
}
