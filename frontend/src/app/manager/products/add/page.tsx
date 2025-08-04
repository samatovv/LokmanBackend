'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProductStore } from '@/features/Products/model/store';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';
import { ProductReq } from '@/features/Products/type';
import { useCategoryStore } from '@/features/Categories/model/store';

export default function AddProduct() {
  const { createProduct } = useProductStore();
  const { fetchCategories,categories } = useCategoryStore();
  const router = useRouter();

  const [form, setForm] = useState<ProductReq>({
    id: 0,
    name: '',
    description: '',
    price: 0,
    image: null,
    quantity: '',
    article: '',
    isTop: false,
    category: { id: 1, name: '' },
    subcategory: undefined,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadedImagePath, setUploadedImagePath] = useState<string | null>(null);

  useEffect(() => {
    if (!imageFile) {
      setImagePreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(imageFile);
    setImagePreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
  
    if (value.startsWith("cat-")) {
      const categoryId = parseInt(value.replace("cat-", ""), 10);
      const selectedCategory = categories.find(cat => cat.id === categoryId);
  
      if (!isNaN(categoryId)) {
        setForm(prevForm => ({
          ...prevForm,
          category: {
            id: categoryId,
            name: selectedCategory?.name ?? ""
          },
          subcategory: undefined,
        }));
      }
    } else if (value.startsWith("sub-")) {
      const subcategoryId = parseInt(value.replace("sub-", ""), 10);
      const parentCategory = categories.find(cat =>
        cat.subcategories?.some(sub => sub.id === subcategoryId)
      );
      const selectedSubcategory = parentCategory?.subcategories?.find(sub => sub.id === subcategoryId);
  
      if (!isNaN(subcategoryId) && parentCategory && selectedSubcategory) {
        setForm(prevForm => ({
          ...prevForm,
          category: {
            id: parentCategory.id as number,
            name: parentCategory.name ?? ""
          },
          subcategory: {
            id: selectedSubcategory.id as number,
            name: selectedSubcategory.name ?? ""
          }
        }));        
      }
    }
  };

  const handleSelectPopularChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, isTop: e.target.value === 'true' });
  };  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImageFile(e.target.files[0]);
      setUploadedImagePath(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!imageFile) {
      console.error('Файл изображения не выбран');
      return;
    }
  
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('price', String(form.price));
    formData.append('description', form.description);
    formData.append('quantity', form.quantity);
    formData.append('article', form.article);
    formData.append(
      'categoryId',
      String(form.subcategory ? form.subcategory.id : form.category.id)
    );    
    formData.append('image', imageFile);
    formData.append('isTop', form.isTop ? 'true' : 'false');
  
    try {
      const result = await createProduct(formData);
  
      if (result.image) {
        setUploadedImagePath(result.image);
      }
  
      router.push('/manager/products');
    } catch (error) {
      console.error('Ошибка при создании товара', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  

  return (
    <div className="p-4 w-full mx-auto shadow-md">
      <h1 className="text-2xl font-bold mb-6">Добавить товар</h1>
      <form onSubmit={handleSubmit} className="grid gap-6">
        <div>
          <Label htmlFor="name" className="mb-1 block font-medium">Название</Label>
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="category" className="mb-1 block font-medium">Категория или Подкатегория</Label>
          <select
            id="category"
            name="category"
            value={
              form.subcategory
                ? `sub-${form.subcategory.id}`
                : form.category
                ? `cat-${form.category.id}`
                : ''
            }            
            onChange={handleSelectChange}
            required
            className="border px-3 py-2 rounded w-full"
          >
            <option value="" disabled>Выберите категорию или подкатегорию</option>
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

        <div>
          <Label htmlFor="price" className="mb-1 block font-medium">Цена</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="description" className="mb-1 block font-medium">Описание</Label>
          <Textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="quantity" className="mb-1 block font-medium">Количество</Label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            value={form.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="article" className="mb-1 block font-medium">Артикул</Label>
          <Input
            id="article"
            name="article"
            value={form.article}
            onChange={handleChange}
            required
          />
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

        <div>
          <Label htmlFor="image" className="mb-1 block font-medium">Изображение</Label>
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
          {imagePreview && !uploadedImagePath ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={imagePreview}
                alt="Превью изображения"
                width={200}
                height={200}
                className="mt-4 rounded object-contain"
            />
            ) : null}

            {uploadedImagePath ? (
            <Image
                src={`/${uploadedImagePath}`}
                alt="Загруженное изображение"
                width={200}
                height={200}
                className="mt-4 rounded object-contain"
            />
          ) : null}
        </div>

        <Button type="submit" className="w-[40%]">
          Добавить
        </Button>
      </form>
    </div>
  );
}
