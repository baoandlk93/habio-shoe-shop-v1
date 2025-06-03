"use client";
import { Product } from "@/server/entity";
import { useState, useEffect } from "react";
export default function AdminProductTable({
  onEdit,
  onDelete,
}: {
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}) {
  const [products, setProducts] = useState<Product[]>([]);

  // Load sản phẩm ban đầu
  const fetchProducts = async () => {
    const res = await fetch("/api/admin/products", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden h-full max-h-[calc(100vh-64px)] bg-white p-4 rounded-lg shadow-lg w-full">
      <table className="w-full border text-center text-black mt-4">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Hình</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* Giả sử có biến products */}
          {products !== null && products.length > 0
            ? products?.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-8"
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => onEdit(product)}
                      className="px-2 py-1 bg-green-500 text-white rounded"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            : ""}
        </tbody>
      </table>
    </div>
  );
}
