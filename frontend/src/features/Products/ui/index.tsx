'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useProductStore } from '../model/store';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Trash2, Pencil } from 'lucide-react';
import { useCategoryStore } from '@/features/Categories/model/store';
import { baseURL } from '@/api';

export default function Products() {
  const { products, fetchProducts, deleteProduct } = useProductStore();
  const router = useRouter();
  const {categories, fetchCategories } = useCategoryStore();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('categoryId');
  const [search, setSearch] = useState("");
  const subCategoryId = searchParams.get('subCategoryId');
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    
    if(value === "") {
      router.push(`/manager/products`);
    } else if (value.startsWith("cat-")) {
      const categoryId = parseInt(value.replace("cat-", ""), 10);
      const selectedCategory = categories.find(cat => cat.id === categoryId);
  
      router.push(`/manager/products?categoryId=${selectedCategory?.id}`);
    } else if (value.startsWith("sub-")) {
      const subcategoryId = parseInt(value.replace("sub-", ""), 10);
      const parentCategory = categories.find(cat =>
        cat.subcategories?.some(sub => sub.id === subcategoryId)
      );
      const selectedSubcategory = parentCategory?.subcategories?.find(sub => sub.id === subcategoryId);
  
      router.push(`/manager/products?subCategoryId=${selectedSubcategory?.id}`);
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  

  useEffect(() => {
    const params: { categoryId?: number, subCategoryId?: number } = {};

    if (categoryId) {
      params.categoryId = Number(categoryId);
    }

    if (subCategoryId) {
        params.subCategoryId = Number(subCategoryId);
    }

    fetchProducts(params);
    fetchCategories();
  }, [fetchProducts, fetchCategories, categoryId, subCategoryId]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Товары</h1>
        <div>
          <input
            type="text"
            placeholder="Поиск"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-2 py-1 outline-none"
          />
        </div>
        <div>
        <select
            id="category"
            name="category"
            onChange={handleSelectChange}
            required
            className="border px-3 py-2 rounded w-full"
          >
            <option value="">Все</option>
            {categories
            .filter((cat) => cat.parentId === null)
            .map((category) => (
              <optgroup key={category.id} label={category.name}>
                <option value={`cat-${category.id}`}>{category.name}</option>
                {category.subcategories?.map((sub) => (
                  <option key={sub.id} value={`sub-${sub.id}`}>
                    └ {sub.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <Link href="/manager/products/add" className="bg-[#15A8E3] text-white px-4 py-2 rounded">
          Добавить товар
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Фото</th>
              <th className="p-2 border">Название</th>
              <th className="p-2 border">Категория</th>
              <th className="p-2 border">Цена</th>
              <th className="p-2 border">Кол-во</th>
              <th className="p-2 border">Артикул</th>
              <th className="p-2 border">Дата</th>
              <th className='p-2 border'>ТОП</th>
              <th className="p-2 border">Действия</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="text-center">
                <td className="p-2 flex justify-center items-center">
                    <Image
                        src={`${baseURL}/uploads/${product.image}`}
                        alt={product.name}
                        width={64}
                        height={64}
                        className="object-cover rounded w-20 h-20"
                        unoptimized
                    />
                </td>
                <td className="p-2 border">{product.name}</td>
                <td className="p-2 border">{product.category?.name}</td>
                <td className="p-2 border">{product.price} $</td>
                <td className="p-2 border">{product.quantity}</td>
                <td className="p-2 border">{product.article}</td>
                <td className="p-2 border">
                  {new Date(product.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2 border">{product.isTop ? 'Да' : 'Нет'}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => router.push(`/manager/products/edit/${product.id}`)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center p-4 text-gray-500">
                  Товары не найдены
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
