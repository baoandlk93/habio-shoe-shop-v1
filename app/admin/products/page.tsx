"use client";
import { useState } from "react";
import AdminProductTable from "@/components/admin/products/AdminProductTable";
import AdminProductForm from "@/components/admin/products/AdminProductForm";
import Modal from "@/components/Modal";
import { Product } from "@/server/entity";

export default function AdminProductPage() {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<Product | null>(null);

  const handleAdd = () => {
    setEditData(null); // Không truyền dữ liệu ban đầu => thêm mới
    setOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditData(product); // Truyền dữ liệu sản phẩm để sửa
    setOpen(true);
  };

  const handleSubmit = async (formData: Product) => {
    if (editData) {
      const updatedProduct = {
        ...editData,
        name: formData.name,
        price: formData.price,
        image: formData.image,
        description: formData.description,
        category: formData.category,
        stock: formData.stock,
      };
      await fetch("/api/admin/products", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });
      setOpen(false);
    } else {
      const newProduct = {
        name: formData.name,
        price: formData.price,
        image: formData.image,
        description: formData.description,
        category: formData.category,
        stock: formData.stock,
      };
      await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      setOpen(false);
    }
  };

  const handleDelete = async (id: number) => {
    await fetch("/api/admin/products", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    setOpen(false);
  };

  return (
    <div className="p-8 max-w-full mx-auto">
      <h1 className="text-xl font-bold mb-4">Quản lý sản phẩm</h1>
      <button
        onClick={handleAdd}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Thêm sản phẩm
      </button>
      <AdminProductTable onEdit={handleEdit} onDelete={handleDelete} />
      <Modal open={open} onClose={() => setOpen(false)}>
        <AdminProductForm
          initialData={editData}
          onSubmit={handleSubmit}
          onClose={() => setOpen(false)}
        />
      </Modal>
    </div>
  );
}
