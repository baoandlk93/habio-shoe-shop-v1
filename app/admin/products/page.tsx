"use client";
import { useState } from "react";
import AdminProductTable from "@/components/admin/products/AdminProductTable";
import AdminProductForm from "@/components/admin/products/AdminProductForm";
import Modal from "@/components/Modal";
import { Product } from "@/server/entity";

export default function AdminProductPage() {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

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
      };
      setProducts(
        products.map((p) => (p.id === editData.id ? updatedProduct : p))
      );
      // Gọi API cập nhật sản phẩm ở đây
    } else {
      const newProduct = {
        id: products.length + 1,
        name: formData.name,
        price: formData.price,
        image: formData.image,
      };
      setProducts([...products, newProduct]);
      // Gọi API thêm mới sản phẩm ở đây
    }
    setOpen(false);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
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
      <AdminProductTable
        onEdit={handleEdit}
        onDelete={handleDelete}
        products={products}
      />
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
