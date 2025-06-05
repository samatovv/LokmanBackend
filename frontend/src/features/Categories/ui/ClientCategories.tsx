'use client';

import { Container } from "@/shared/helpers/Container";
import { useCategoryStore } from "../model/store";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { baseURL } from "@/api";

const ITEM_WIDTH = 180;

export default function ClientCategories() {
    const { categories, fetchCategories } = useCategoryStore();
    const [index, setIndex] = useState(0);
    const router = useRouter();

    const maxIndex = Math.max(0, categories.length - 4); 

    const scroll = (dir: "left" | "right") => {
        setIndex((prev) => {
            const next = dir === "left" ? prev - 1 : prev + 1;
            return Math.max(0, Math.min(next, maxIndex));
        });
    };

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return (
        <div className="relative mt-8">
            <Container>
                <div className="flex items-center justify-end gap-2 mb-4">
                    <button
                        onClick={() => scroll("left")}
                        disabled={index === 0}
                        className="p-2 rounded-full bg-[#15A8E3] hover:bg-[#15A8E3]/90 text-white disabled:opacity-50"
                    >
                        <ChevronLeft />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        disabled={index === maxIndex}
                        className="p-2 rounded-full bg-[#15A8E3] hover:bg-[#15A8E3]/90 text-white disabled:opacity-50"
                    >
                        <ChevronRight />
                    </button>
                </div>

                <div className="overflow-hidden">
                    <motion.div
                        className="flex gap-3 md:gap-6 py-2"
                        animate={{ x: -index * ITEM_WIDTH }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        {categories.map((cat) => (
                            <motion.div
                                key={cat.id}
                                className="w-[150px] md:w-[190px] flex-shrink-0 flex flex-col items-center gap-2 rounded-lg cursor-pointer"
                                whileTap={{ scale: 0.97 }}
                                onClick={() => router.push(`/catalog?categoryId=${cat.id}`)}
                            >
                                <Image
                                    src={`${baseURL}/uploads/${cat.image}`}
                                    className="w-[150px] md:w-[190px] h-[150px] md:h-[190px] object-cover rounded-lg mix-blend-darken"
                                    width={100}
                                    height={100}
                                    alt={cat.name}
                                />
                                <p className="text-center font-medium">{cat.name}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </Container>
        </div>
    );
}
