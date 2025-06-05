'use client';

import { Button } from "@/components/ui/button";
import { Product } from "@/features/Products/type";
import { Container } from "@/shared/helpers/Container";
import Image from "next/image";
import { useEffect, useState } from "react";
import { baseURL } from "@/api";

export default function CartPage() {
    const [cartItems, setCartItems] = useState<Product[]>([]);
    
    const handleQuantityChange = (id: number, quantity: number) => {
      const updatedItems = cartItems.map((item) =>
        item.id === id ? { ...item, quantity: quantity.toString() } : item
      );
      setCartItems(updatedItems);
      localStorage.setItem("cart", JSON.stringify(updatedItems));
    };

    const handleRemoveItem = (id: number) => {
      const updatedItems = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedItems);
      localStorage.setItem("cart", JSON.stringify(updatedItems));
    };

    useEffect(() => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    }, []);


  return (
    <Container>
    <div className="w-full mx-auto space-y-8 mt-12">
      <h1 className="text-lg font-normal text-[#184363]">Home / shop / cart</h1>

      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <div className="grid grid-cols-5 bg-slate-100 p-4 font-semibold text-slate-700">
          <div className="col-span-2">Product</div>
          <div className="text-center">Price</div>
          <div className="text-center">Quantity</div>
          <div className="text-right">Subtotal</div>
        </div>

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-5 items-center p-4 border-t border-slate-200"
          >
            <div className="col-span-2 flex items-center gap-4">
              <button onClick={() => handleRemoveItem(item.id)} className="text-slate-400 hover:text-red-500 text-xl">×</button>
              <Image src={`${baseURL}/uploads/${item.image}`} alt={item.name} width={100} height={100} className="w-16 h-16 object-contain" />
              <span className="text-slate-800">{item.name}</span>
            </div>
            <div className="text-center font-semibold">${item.price.toFixed(2)}</div>
            <div className="flex justify-center">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                className="w-16 text-center border rounded-lg px-2 py-1"
              />
            </div>
            <div className="text-right font-semibold">
              ${(item.price * Number(item.quantity)).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Coupon code"
            className="rounded-full px-4 py-2 bg-slate-100 w-full md:w-60"
          />
          <Button className="rounded-full bg-[#F1971F] hover:bg-[#184363] text-white">
            Apply coupon
          </Button>
        </div>
        <Button className="rounded-full bg-[#F1971F] hover:bg-[#184363] text-white px-6">
          Update cart
        </Button>
      </div>

      <div className="w-full md:w-96 ml-auto border border-slate-200 rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-slate-800">Cart totals</h2>
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold">{cartItems.reduce((total, item) => total + item.price * Number(item.quantity), 0).toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Total</span>
          <span className="font-semibold text-lg">{cartItems.reduce((total, item) => total + item.price * Number(item.quantity), 0).toFixed(2)}</span>
        </div>
        <div className="flex flex-col gap-3">
          <Button className="bg-[#F1971F] hover:bg-[#184363] text-white rounded-full">
            Proceed to checkout
          </Button>
          <Button variant="secondary" className="rounded-full">
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
    </Container>
  );
}
