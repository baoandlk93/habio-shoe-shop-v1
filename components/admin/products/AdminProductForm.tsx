"use client";
import { useState, useEffect } from "react";
import { Product } from "@/server/entity";
export default function AdminProductForm({
  initialData,
  onSubmit,
  onClose,
}: {
  initialData: Product | null;
  onSubmit: (data: Product) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setPrice(initialData.price.toString() || "");
      setImage(initialData.image || "");
    } else {
      setName("");
      setPrice("");
      setImage("");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = initialData?.id || 0;
    onSubmit({ id, name, price: Number(price), image });
  };

  return (
    <div className="flex flex-col gap-4 p-12">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Tên sản phẩm</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Giá</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Hình ảnh (URL)</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Huỷ
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {initialData ? "Cập nhật" : "Thêm mới"}
          </button>
        </div>
      </form>
    </div>
  );
}
