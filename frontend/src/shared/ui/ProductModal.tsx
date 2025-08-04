'use client';

import { Product } from "@/features/Products/type";
import { Dialog, DialogContent } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Image from "next/image";
import { baseURL } from "@/api";

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
}

export default function ProductModal({ open, onClose, product }: ProductModalProps) {
  if (!product) return null;

  return (
    <Dialog
      open={open}
      onClose={(e: React.MouseEvent) => {
        e.stopPropagation();
        onClose();
      }}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 6, 
          padding: 0,
        },
      }}
    >
      <DialogContent className="p-0 md:p-0 relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 z-10 text-[#184363] hover:rotate-180 transition-transform duration-300 cursor-pointer"
        >
          <CloseIcon sx={{ fontSize: 28 }} />
        </button>

        <div className="flex flex-col md:flex-row gap-6 p-6">
          <div className="w-[100%] md:w-[50%]">
            <Image
              src={`${baseURL}/uploads/${product.image}`}
              alt={product.name}
              width={500}
              height={400}
              className="rounded-xl w-full h-auto object-cover"
              unoptimized
            />
          </div>

          <div className="flex flex-col items-between justify-between text-[#184363] w-[100%] md:w-[50%]">
            <div>
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
            </div>

            <div className="flex items-center gap-4 mt-6">
              <button
                className="bg-[#15A8E3] hover:bg-[#184363] text-white px-6 py-3 cursor-pointer md:h-full rounded-full transition"
              >
                Узнать цену
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
