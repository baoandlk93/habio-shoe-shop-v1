"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: string;
};

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Partial<Product>>({});
  const [editingId, setEditingId] = useState<number | null>(null);

  // Load sản phẩm ban đầu
  const fetchProducts = async () => {
    const res = await fetch("/api/products", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Thay đổi ô nhập
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Thêm hoặc sửa sản phẩm
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) return;

    if (editingId) {
      // Sửa
      await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...form }),
      });
    } else {
      // Thêm
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setForm({});
    setEditingId(null);
    fetchProducts();
  };

  // Bắt đầu sửa
  const handleEdit = (product: Product) => {
    setForm({ name: product.name, price: product.price });
    setEditingId(product.id);
  };

  // Xoá sản phẩm
  const handleDelete = async (id: number) => {
    await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchProducts();
  };

  // Hủy sửa
  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({});
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h1>Danh sách sản phẩm giày</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <input
          type="text"
          name="name"
          placeholder="Tên sản phẩm"
          value={form.name || ""}
          onChange={handleChange}
          required
          style={{ marginRight: 8 }}
        />
        <input
          type="text"
          name="price"
          placeholder="Giá bán"
          value={form.price || ""}
          onChange={handleChange}
          required
          style={{ marginRight: 8 }}
        />
        <button type="submit">{editingId ? "Cập nhật" : "Thêm mới"}</button>
        {editingId && (
          <button
            type="button"
            onClick={handleCancelEdit}
            style={{ marginLeft: 8 }}
          >
            Hủy
          </button>
        )}
      </form>

      <table border={1} cellPadding={8} cellSpacing={0} width="100%">
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Giá bán</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan={3} style={{ textAlign: "center" }}>
                Chưa có sản phẩm nào
              </td>
            </tr>
          )}
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <button onClick={() => handleEdit(product)}>Sửa</button>
                <button
                  onClick={() => handleDelete(product.id)}
                  style={{ marginLeft: 8, color: "red" }}
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
