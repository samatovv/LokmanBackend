'use client';

import { Product } from "@/features/Products/type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function CartPopup({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="absolute top-16 right-0 w-80 bg-white shadow-lg rounded-lg border z-50 p-5 text-[#184363]">
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          <ul className="space-y-2 max-h-60 overflow-y-auto">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-[#184363]/70">Quantity: {item.quantity}</p>
                </div>
                <p className="font-semibold text-[#15A8E3]">${item.price * (typeof item.quantity === 'number' ? item.quantity : 0)}</p>
              </li>
            ))}
            <li className="flex justify-between items-center border-b pb-2">
              <p className="font-semibold">Total:</p>
              <p className="font-semibold text-[#15A8E3]">${cartItems.reduce((total, item) => total + item.price * (typeof item.quantity === 'number' ? item.quantity : 0), 0)}</p>
            </li>
          </ul>
          <button onClick={() => {
            router.push('/cart')
            onClose();
          }} 
          className="bg-[#F1971F] text-white py-2 px-4 rounded mt-4 w-full cursor-pointer">View Cart</button>
          <button className="bg-[#15A8E3] text-white py-2 px-4 rounded mt-4 w-full cursor-pointer">Checkout</button>
        </>
      )}
    </div>
  );
}
