export interface CategoryReq {
    parentId: null;
    id?: number;
    name: string;
    popular: boolean;
    image?: string
    subcategories?: CategoryReq[]
}

export interface PopularCategoryState {
    id: number;
    name: string;
    popular: boolean;
    image: string;
}