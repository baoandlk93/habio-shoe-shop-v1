"use client";
import { useState, useEffect } from "react";
import { IProduct, ICategory } from "@/server/entity";
export default function AdminProductForm({
  initialData,
  onSubmit,
  onClose,
}: {
  initialData: IProduct | null;
  onSubmit: (data: IProduct) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<ICategory | "">("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setPrice(initialData.price.toString() || "");
      setImage(initialData.image || "");
      setDescription(initialData.description || "");
      setCategory(initialData.category || "");
      setStock(initialData.stock.toString() || "");
    } else {
      setName("");
      setPrice("");
      setImage("");
      setDescription("");
      setCategory(null);
      setStock("");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = initialData?.id || 0;
    onSubmit({
      id,
      name,
      price: Number(price),
      image,
      description,
      category: category!,
      stock: Number(stock),
    });
    onClose();
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg mx-auto animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {initialData ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Tên sản phẩm
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Nhập tên sản phẩm..."
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Giá</label>
          <input
            type="number"
            min="0"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="Nhập giá sản phẩm..."
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Hình ảnh (URL)
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            placeholder="Dán đường dẫn ảnh sản phẩm..."
          />
          {image && (
            <div className="mt-2 flex justify-center">
              <img
                src={image}
                alt="Preview"
                width={100}
                height={100}
                className="h-24 w-24 object-cover rounded-lg border shadow"
              />
            </div>
          )}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Mô tả</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            placeholder="Nhập mô tả sản phẩm..."
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Loại</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={category}
            onChange={(e) => setCategory(e.target.value as ICategory)}
            required
          >
            <option value="" disabled>
              Chọn loại sản phẩm...
            </option>
            {Object.entries(ICategory).map(([key, value]) => (
              <option key={key} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Số lượng
          </label>
          <input
            type="number"
            min="0"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            placeholder="Nhập số lượng trong kho..."
          />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition"
          >
            Huỷ
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow transition"
          >
            {initialData ? "Cập nhật" : "Thêm mới"}
          </button>
        </div>
      </form>
    </div>
  );
}
