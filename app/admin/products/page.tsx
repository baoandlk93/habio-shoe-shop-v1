"use client";
import { useState } from "react";
import AdminProductTable from "@/components/admin/products/AdminProductTable";
import AdminProductForm from "@/components/admin/products/AdminProductForm";
import Modal from "@/components/Modal";
import { IProduct, ICategory } from "@/server/entity";
import { toast } from "react-toastify";
import { supabaseClient } from "@/lib/supabase/client";
import { faker } from "@faker-js/faker";

export default function AdminProductPage() {
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editData, setEditData] = useState<IProduct | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [productToDelete, setProductToDelete] = useState<IProduct | null>(null);

  const productsToInsert = Array.from({ length: 1000 }, () => ({
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.url(),
    description: faker.lorem.sentence(),
    category: faker.helpers.arrayElement([
      ICategory.SHOE,
      ICategory.BOOT,
      ICategory.SANDAL,
      ICategory.SNEAKER,
    ]),
    stock: faker.number.int({ min: 0, max: 100 }),
  }));
  async function addProductsInBulk() {
    try {
      const { data, error } = await supabaseClient
        .from("product")
        .insert(productsToInsert);

      if (error) {
        console.error("Lỗi khi thêm dữ liệu hàng loạt:", error);
        toast.error("Có lỗi xảy ra khi thêm dữ liệu!");
      } else {
        console.log("Thêm thành công 1000 sản phẩm!");
        toast.success("Thêm thành công 1000 sản phẩm!");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }

  const handleAdd = () => {
    setEditData(null); // Không truyền dữ liệu ban đầu => thêm mới
    setOpen(true);
    setIsFetching(false);
  };

  const handleEdit = (product: IProduct) => {
    setEditData(product); // Truyền dữ liệu sản phẩm để sửa
    setOpen(true);
    setIsFetching(false);
  };
  const handleDelete = async (product: IProduct) => {
    setProductToDelete(product);
    setDeleteModal(true);
    setIsFetching(false);
  };

  const handleDeleteConfirm = async () => {
    if (productToDelete) {
      await fetch("/api/admin/products", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: productToDelete.id }),
      });
      setDeleteModal(false);
      setIsFetching(true);
      toast.success("Xoá sản phẩm thành công!");
    }
  };

  const handleSubmit = async (formData: IProduct) => {
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
      setIsFetching(true);
      toast.success("Sửa sản phẩm thành công!");
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
      setIsFetching(true);
      toast.success("Thêm sản phẩm thành công!");
    }
  };

  return (
    <div className="p-2 pt-0 max-w-full mx-auto">
      <button
        onClick={handleAdd}
        className="mb-2 px-4 py-2 text-xs bg-blue-600 text-white rounded-full"
      >
        Thêm sản phẩm
      </button>
      <AdminProductTable
        onFetching={isFetching}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Modal open={open} onClose={() => setOpen(false)}>
        <AdminProductForm
          initialData={editData}
          onSubmit={handleSubmit}
          onClose={() => setOpen(false)}
        />
      </Modal>
      <Modal open={deleteModal} onClose={() => setDeleteModal(false)}>
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md mx-auto animate-fadeIn">
          <div className="flex flex-col items-center">
            <div className="bg-red-100 flex items-center justify-center w-16 h-16 rounded-full mb-4">
              <svg
                className="h-8 w-8 text-red-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Xoá sản phẩm
            </h2>
            <p className="text-center text-gray-600 mb-4">
              {productToDelete?.name ? (
                <>
                  Bạn có chắc chắn muốn xoá{" "}
                  <span className="font-semibold text-red-500">
                    "{productToDelete.name}"
                  </span>
                  ?<br />
                  Hành động này không thể hoàn tác.
                </>
              ) : (
                <>
                  Bạn có chắc chắn muốn xoá sản phẩm này?
                  <br />
                  Hành động này không thể hoàn tác.
                </>
              )}
            </p>
            <div className="flex gap-3 mt-2 justify-end w-full">
              <button
                onClick={() => setDeleteModal(false)}
                className="px-5 py-2 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Huỷ
              </button>
              <button
                onClick={() => {
                  if (productToDelete) {
                    handleDeleteConfirm();
                    setDeleteModal(false);
                  }
                }}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow transition"
              >
                Xoá
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
