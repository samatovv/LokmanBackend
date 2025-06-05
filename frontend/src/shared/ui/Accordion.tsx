'use client';

import { useCategoryStore } from "@/features/Categories/model/store";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function CategoryAccordion( { onSelect }: { onSelect?: () => void} ) {
    const { categories } = useCategoryStore();
    const router = useRouter();
    const searchParams = useSearchParams();
    const categoryId = searchParams.get("categoryId");
    const subCategoryId = searchParams.get("subCategoryId");

    const [expandedId, setExpandedId] = useState<string | false>(false);

    const handleAccordionChange = (id: string, hasSubcategories: boolean) => () => {
        if (hasSubcategories) {
            setExpandedId(prev => (prev === id ? false : id));
        } else {
            onSelect?.();
            router.push(`?categoryId=${id}`);
        }
    };

    return (
        <div className="w-full">
            {categories
                .filter(category => category.parentId === null)
                .map((category) => {
                    const hasSubcategories = category.subcategories && category.subcategories.length > 0;
                    const isSelected = categoryId === String(category.id);
                    const isSubcategorySelected = category.subcategories?.some(
                        (sub) => String(sub.id) === subCategoryId
                    );

                    return (
                        <Accordion
                            key={category.id}
                            expanded={expandedId === String(category.id)}
                            onChange={handleAccordionChange(String(category.id), Boolean(hasSubcategories))}
                            elevation={0}
                            disableGutters
                            square
                            sx={{
                                background: "transparent",
                                boxShadow: "none",
                                '&:before': { display: 'none' },
                            }}
                        >
                            <AccordionSummary
                                expandIcon={hasSubcategories ? <ExpandMoreIcon /> : null}
                                aria-controls={`panel-${category.id}-content`}
                                id={`panel-${category.id}-header`}
                                onClick={() => router.push(`?categoryId=${category.id}&categoryName=${category.name}`)}
                                sx={{
                                    px: 0,
                                    color: isSelected || isSubcategorySelected ? "#15A8E3" : "#184363",
                                    cursor: "pointer",
                                    "&:hover": {
                                        color: "#15A8E3",
                                    },
                                }}
                            >
                                <Typography className="font-medium text-base">
                                    {category.name}
                                </Typography>
                            </AccordionSummary>

                            {hasSubcategories && (
                                <AccordionDetails sx={{ pl: 3 }}>
                                    {category.subcategories && category.subcategories.map((sub) => (
                                        <Typography
                                            key={sub.id}
                                            sx={{
                                                color: String(sub.id) === subCategoryId ? "#15A8E3" : "#184363",
                                            }}
                                            onClick={() => {
                                                onSelect?.();
                                                router.push(`?categoryId=&subCategoryId=${sub.id}&categoryName=${category.name}&subCategoryName=${sub.name}`)
                                            }}
                                            variant="body2"
                                            className="font-medium text-base cursor-pointer"
                                        >
                                            {sub.name}
                                        </Typography>
                                    ))}
                                </AccordionDetails>
                            )}
                        </Accordion>
                    );
                })}
        </div>
    );
}
