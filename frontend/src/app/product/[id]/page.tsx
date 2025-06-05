'use client'

import { useProductStore } from "@/features/Products/model/store";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { Container } from "@/shared/helpers/Container";
import { ImageZoom } from "@/shared/ui/ImageZoom";
import { baseURL } from "@/api";

export default function ProductDetailsPage() {
  const { product, getProductById } = useProductStore();
  const params = useParams();


  useEffect(() => {
    getProductById(Number(params.id));
  }, [getProductById, params.id]);

  if (!product) return <p className="p-10">Loading...</p>;

  return (
    <Container>
        <div className="w-full mx-auto grid md:grid-cols-2 gap-12 mt-15">
            <div className="relative group overflow-hidden rounded-lg border">
                <ImageZoom
                    src={`${baseURL}/uploads/${product.image}`}
                    alt={product.name || "Product"}
                />
            </div>

            <div className="flex flex-col gap-4 text-[#184363]">
                <div className="flex flex-col gap-4 border-b pb-5">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                </div>

                <p className="text-2xl font-semibold py-5 text-[#15A8E3]">${product.price}</p>

                <ul className="list-disc ml-5 text-sm">
                <li>Артикул: {product.article}</li>
                <li>Категория: {product.category?.name}</li>
                <li>Количество: {product.quantity}</li>
                </ul>

                <p className="text-sm leading-6 mt-4 text-[#184363]/90">
                {product.description}
                </p>

                <div className="flex items-center gap-4 mt-6">
                    <button className="bg-[#15A8E3] flex items-center gap-4 text-[#ffffff] px-6 py-3 rounded-full hover:bg-[#184363] hover:text-white transition">
                        <p>Узнать цену</p>
                    </button>
                </div>
            </div>
        </div>
    </Container>
  );
}
