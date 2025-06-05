'use client'

import { useEffect } from "react";
import { useProductStore } from "../Products/model/store";
import { useRouter, useSearchParams } from "next/navigation";
import CategoryAccordion from "@/shared/ui/Accordion";

export default function Filters({ onSelect }: { onSelect?: () => void }) {
    const { fetchProducts } = useProductStore();

    const router = useRouter();
    const searchParams = useSearchParams();
    const categoryId = searchParams.get('categoryId');
    const subCategoryId = searchParams.get('subCategoryId');

    useEffect(() => {
        const params: {
          categoryId?: number;
          subCategoryId?: number;
        } = {};
      
        if (categoryId) params.categoryId = parseInt(categoryId, 10);
        if (subCategoryId) params.subCategoryId = Number(subCategoryId);
      
        fetchProducts(params);
      }, [categoryId, subCategoryId, fetchProducts]);      

    return (
        <div className="w-[200px] text-[#184363]">
            <h2 className="text-2xl font-[500]">Выбор по категориям</h2>
            <div className="border-b my-4"></div>
            <div className="flex flex-col gap-4 mb-8">
                <p
                    className={`text-lg font-[500] hover:text-[#15A8E3] cursor-pointer ${!categoryId && !subCategoryId ? "text-[#15A8E3]" : ""}`}
                    onClick={() => {
                        router.push(`/catalog`);
                    }}
                >
                    Все категории
                </p>
                <CategoryAccordion onSelect={onSelect}/>
            </div>
        </div>
    );
}
