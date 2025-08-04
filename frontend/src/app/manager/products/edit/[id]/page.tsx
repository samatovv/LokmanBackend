'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useProductStore } from '@/features/Products/model/store';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { Category } from '@/features/Products/type';
import { useCategoryStore } from '@/features/Categories/model/store';
import { baseURL } from '@/api';

export default function EditProductPage() {
  const { products, updateProduct, fetchProducts } = useProductStore();
  const { fetchCategories,categories } = useCategoryStore();
  const router = useRouter();
  const params = useParams();
  const productId = params?.id as string;

  const [form, setForm] = useState<{
    name: string;
    price: string;
    description: string;
    quantity: number;
    article: string;
    category: Category;
    image: File | string | null;
    isTop?: boolean
  }>({
    name: '',
    price: '',
    description: '',
    quantity: 0,
    article: '',
    category: { id: 1, name: '' },
    image: null,
    isTop: false
  });
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  useEffect(() => {
    const product = products.find(p => p.id.toString() === productId);
    if (product) {
      setForm({
        name: product.name,
        price: product.price.toString(),
        description: product.description,
        quantity: parseInt(product.quantity),
        article: product.article,
        category: product.category || { id: 1, name: '' },
        image: product.image,
        isTop: product.isTop
      });
      setImagePreview(`${baseURL}/uploads/${product.image}`);
    }
  }, [products, productId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, category: { id: parseInt(e.target.value) } });
  };

  const handleSelectPopularChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, isTop: e.target.value === 'true' });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm(prev => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };  

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(form);
    e.preventDefault();
    await updateProduct(parseInt(productId), {
      ...form,
      price: parseFloat(form.price),
      quantity: form.quantity.toString(),
      isTop: form.isTop,
    });
    router.push('/manager/products');
  };

  return (
    <div className="p-4 w-full mx-auto shadow-md">
      <h1 className="text-2xl font-bold mb-6">Редактировать товар</h1>
      <form onSubmit={handleSubmit} className="grid gap-6">
        <div>
          <Label htmlFor="name" className="mb-1 block font-medium">Название</Label>
          <Input id="name" name="name" value={form.name} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="category" className="mb-1 block font-medium">Категория</Label>
          <select
            id="category"
            name="category"
            value={form.category?.id ?? ''}
            onChange={handleSelectChange}
            required
          >
            <option value="" disabled>Выберите категорию</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="price" className="mb-1 block font-medium">Цена</Label>
          <Input id="price" name="price" type="number" step="0.01" value={form.price} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="description" className="mb-1 block font-medium">Описание</Label>
          <Textarea id="description" name="description" value={form.description} onChange={handleChange} required rows={4} />
        </div>

        <div>
          <Label htmlFor="quantity" className="mb-1 block font-medium">Количество</Label>
          <Input id="quantity" name="quantity" type="number" value={form.quantity} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="article" className="mb-1 block font-medium">Артикул</Label>
          <Input id="article" name="article" value={form.article} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="isTop" className="mb-1 block font-medium">Топ продаж</Label>
          <select
            id="isTop"
            name="isTop"
            value={form.isTop ? 'true' : 'false'}
            onChange={handleSelectPopularChange}
            required
          >
            <option value="true">Да</option>
            <option value="false">Нет</option>
          </select>
        </div>

        {imagePreview && (
          <Image
            src={imagePreview}
            alt="Предыдущая картинка"
            width={200}
            height={200}
            className="mt-4 rounded object-contain"
          />
        )}
        <div>
            <Label htmlFor="image" className="mb-1 block font-medium">Новое изображение</Label>
            <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
            />
        </div>

        <Button type="submit" className="w-[40%]">
          Сохранить изменения
        </Button>
      </form>
    </div>
  );
}
