'use client'

import { Container } from "@/shared/helpers/Container";
import { usePopularCategoriesStore } from "../model/store";
import { useEffect } from "react";
import Card from "@/shared/ui/Card";
import { useRouter } from "next/navigation";

export default function PopularCategories() {
    const { fetchPopularCategories, fetchPopularProducts, popularCategories, popularProductsByCategory } = usePopularCategoriesStore();
    const router = useRouter();

    useEffect(() => {
        const loadData = async () => {
            await fetchPopularCategories();
        };

        loadData();
    }, []);

    useEffect(() => {
        if (popularCategories.length > 0) {
            popularCategories.forEach(category => {
                fetchPopularProducts({ categoryId: String(category.id) });
            });
        }
    }, [fetchPopularProducts, popularCategories]);

    return (
        <div className="mt-15">
            <Container>
                <h2 className="text-3xl font-[600] text-[#184363] text-center">Популярные товары</h2>

                {popularCategories.map((category) => {
                    const products = popularProductsByCategory[category.id] || [];

                    return (
                        <div key={category.id} className="mt-10">
                            <h3 onClick={() => router.push(`/catalog?categoryId=${category.id}`)} className="text-2xl font-semibold text-[#184363] mb-4 hover:underline hover:text-[#15A8E3] cursor-pointer">{category.name}</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-6">
                                {products.map((product) => (
                                    <Card key={product.id} data={product} />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </Container>
        </div>
    );
}