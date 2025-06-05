'use client';

import Filters from "@/features/Filters";
import { Container } from "@/shared/helpers/Container";
import { useProductStore } from "@/features/Products/model/store";
import { PackageX } from "lucide-react";
import { useEffect, useState } from "react";
import Card from "@/shared/ui/Card";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from "framer-motion";

export default function CatalogClient() {
    const { products, fetchProducts, loading } = useProductStore();
    const searchParams = useSearchParams();
    const categoryId = searchParams.get('categoryId');
    const subCategoryId = searchParams.get('subCategoryId');
    const categoryName = searchParams.get('categoryName');
    const subCategoryName = searchParams.get('subCategoryName');
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const params: { categoryId?: number; subCategoryId?: number } = {};
      
        if (categoryId) {
          params.categoryId = Number(categoryId);
        }
      
        if (subCategoryId) {
          params.subCategoryId = Number(subCategoryId);
        }
      
        fetchProducts(params);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [categoryId, subCategoryId]);      

    return (
        <div className="mt-8 md:mt-15">
            <Container>
                <div className="flex gap-10">
                    <div className="hidden md:block">
                        <Filters />
                    </div>
                    <div className="w-full">
                        {loading ? (
                            <div
                                className="fixed inset-0 z-50 flex items-center justify-center"
                                style={{ backgroundColor: 'rgba(30, 30, 30, 0.4)' }}
                            >                          
                                <div className="flex flex-col items-center text-[#184363]">
                                <AutorenewIcon 
                                    sx={{ 
                                        fontSize: 64, 
                                        animation: 'spin 1.3s linear infinite', 
                                        color: 'black', 
                                        strokeWidth: 1,
                                        '& path': { strokeWidth: 1 }
                                    }} 
                                />
                                </div>
                            </div>
                        ) : products.length === 0 ? (
                            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center text-[#184363]">
                                <PackageX size={64} className="mb-6 text-gray-400" />
                                <h2 className="text-2xl font-semibold mb-2">Ничего не найдено</h2>
                                <p className="text-gray-500">Попробуйте изменить фильтры</p>
                            </div>
                        ) : (
                            <div>
                                <div className="md:hidden flex items-center justify-between mb-4 px-1">
                                    <h2 className="text-xl font-semibold text-[#184363]">Каталог</h2>
                                    <button
                                        onClick={() => setMobileFilterOpen(true)}
                                        className="flex items-center gap-2 border border-[#15A8E3] text-[#15A8E3] px-3 py-1.5 rounded-full text-sm font-medium hover:bg-[#15A8E3] hover:text-white transition"
                                    >
                                        <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M6 8h12M10 12h4M14 16h-4m-4 4h12" />
                                        </svg>
                                        Категория
                                    </button>
                                </div>
                                <p className="md:hidden text-sm text-[#184363] mb-4">
                                  <span 
                                    onClick={() => router.push(`/catalog?categoryId=${categoryId}&categoryName=${categoryName}`)} 
                                    className="text-[#15A8E3] cursor-pointer"
                                  >
                                    {categoryName}
                                  </span>
                                  {subCategoryName ? ` / ${subCategoryName}` : ''}
                                </p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
                                    {products.map((product) => (
                                        <Card data={product} key={product.id}/>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
            <AnimatePresence>
                {mobileFilterOpen && (
                    <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black z-40"
                        onClick={() => setMobileFilterOpen(false)}
                    />
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed top-0 left-0 w-3/4 h-full bg-white z-50 p-4 overflow-y-auto"
                    >
                        <Filters onSelect={() => setMobileFilterOpen(false)}/>
                    </motion.div>
                    </>
                )}
            </AnimatePresence>

            <style jsx global>{`
                @keyframes spin {
                    0% { transform: rotate(0deg);}
                    100% { transform: rotate(360deg);}
                }
            `}</style>
        </div>
    );
}
