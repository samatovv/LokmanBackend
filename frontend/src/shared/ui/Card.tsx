/* eslint-disable @next/next/no-img-element */
// import Image from "next/image";
import { Product } from "@/features/Products/type";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProductModal from "./ProductModal";
import { baseURL } from "@/api";

export default function Card({ data }: { data: Product }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    
    return (
        <div onClick={() => router.push(`/product/${data.id}`)} className="w-full h-[380px] cursor-pointer flex flex-col justify-between group relative rounded-2xl transition-all duration-300">
            <div className="relative w-full h-[200px] rounded-xl overflow-hidden">
                <img
                    className="w-full h-full object-cover"
                    src={`${baseURL}/uploads/${data.image}`}
                    alt={data.name}
                    width={300}
                    height={200}
                />
                <div className="absolute top-4 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        className="bg-white p-1 rounded-full shadow hover:bg-gray-100"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsModalOpen(true);
                        }}
                        >
                        <SearchIcon sx={{ fontSize: 20, color: '#184363' }} />
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-1 min-h-[100px]">
                <p className="text-[#15A8E3] text-sm font-normal truncate mb-2">{data.category.name}</p>
                <p className="text-[#184363] text-base font-semibold line-clamp-1">{data.name}</p>
                {data.price && <p className="text-[#184363] text-lg font-medium">{data.price} $</p>}
            </div>

            <div>
                <button className="w-full flex items-center justify-center gap-2 bg-[#ECF4F6] text-[#184363] hover:bg-[#184363] hover:text-white rounded-full py-3 transition-colors duration-300">
                    <ShoppingCartOutlinedIcon sx={{ color: 'currentColor', fontSize: '20px' }} />
                    <span className="text-sm font-medium">Посмотреть</span>
                </button>
            </div>
            <ProductModal open={isModalOpen} onClose={() => setIsModalOpen(false)} product={data} />
        </div>
    );
}
