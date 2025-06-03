import React from "react";
import { CartItem } from "../server/entity";

const Cart = ({
  cartItems,
  onUpdateQuantity,
  onRemove,
  setOpenCartModal,
}: {
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
  setOpenCartModal: (open: boolean) => void;
}) => {
  // Đảm bảo cartItems luôn là mảng
  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

  const total = safeCartItems.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md min-h-[300px] flex flex-col">
      <h2 className="text-xl font-semibold mb-4 text-center">🛒 Giỏ hàng</h2>
      {safeCartItems.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center text-gray-500">
          <span className="text-5xl mb-2">🛍️</span>
          <p className="mb-1 text-base font-medium">
            Giỏ hàng của bạn đang trống.
          </p>
          <button
            onClick={() => setOpenCartModal(false)}
            className="mt-2 text-blue-500 hover:underline"
          >
            Tiếp tục mua sắm
          </button>
        </div>
      ) : (
        <>
          <ul className="flex-1 overflow-y-auto max-h-72 pr-1">
            {safeCartItems.map((item: CartItem) => (
              <li
                key={item.id}
                className="flex justify-between items-center mb-4 border-b last:border-b-0 pb-3 last:pb-0"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <div className="flex items-center mt-1">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300 transition"
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span className="px-3 select-none">{item.quantity}</span>
                    <button
                      className="px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300 transition"
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-fuchsia-500 font-bold">
                    {(item.price * item.quantity).toLocaleString()}₫
                  </span>
                  <button
                    className="text-red-500 hover:underline mt-1 text-sm"
                    onClick={() => onRemove(item.id)}
                  >
                    Xoá
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-3 border-t flex items-center justify-between">
            <span className="text-base font-bold">Tổng cộng:</span>
            <span className="text-lg text-fuchsia-600 font-extrabold">
              {total.toLocaleString()}₫
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
