'use client'

import React, { useEffect, useState } from "react";
import { useCategoryStore } from "../model/store";
import { Trash2, Pencil } from 'lucide-react';
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { baseURL } from "@/api";

export default function Categories() {
    const {
        categories,
        fetchCategories,
        createCategory,
        updateCategory,
        deleteCategory,
        createSubCategory,
        updateSubCategory,
        deleteSubCategory
    } = useCategoryStore();

    const [name, setName] = useState("");
    const [editId, setEditId] = useState<number | null>(null);
    const [popular, setPopular] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const [showSubModal, setShowSubModal] = useState(false);
    const [subName, setSubName] = useState("");
    const [subImageFile, setSubImageFile] = useState<File | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [subEditId, setSubEditId] = useState<number | null>(null);


    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!name) {
          alert("Введите заголовок.");
          return;
        }
        
        const formData = new FormData();
        formData.append("name", name);
        formData.append("popular", popular.toString());
        if (imageFile) {
            formData.append("image", imageFile);
        }
        
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
          }          
        try {
          if (editId !== null) {
            await updateCategory(editId, formData);
          } else {
            if (!imageFile) {
              alert("Выберите изображение для нового баннера.");
              return;
            }
            await createCategory(formData);
          }
    
          setName('');
          setImageFile(null);
          setPreview(null);
          setEditId(null);
          await fetchCategories();
        } catch (err) {
          console.error("Ошибка при сохранении баннера:", err);
          alert("Произошла ошибка.");
        }
      };

    const handleEdit = (id: number, currentName: string, currentPopular: boolean) => {
        setEditId(id);
        setName(currentName);
        setPopular(currentPopular);
    };    

    const handleDelete = async (id: number) => {
        if (confirm("Are you sure you want to delete this category?")) {
            await deleteCategory(id);
        }
    };

    const handleDeleteSub = async (id: number) => {
        if (confirm("Are you sure you want to delete this subcategory?")) {
            await deleteSubCategory(id);
        }
    };

    return (
        <div className="p-6 w-full mx-auto">
            <h1 className="text-2xl font-bold mb-4">категории</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">
                <div className="flex items-center gap-4 mb-2 w-full">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="введите название категории..."
                        className="flex-1 border px-4 py-2 rounded"
                    />
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={popular}
                            onChange={(e) => setPopular(e.target.checked)}
                        />
                        <span>Популярная</span>
                    </label>
                    <button
                        type="submit"
                        className="bg-[#15A8E3] text-white px-4 py-2 rounded hover:bg-[#15A8E3]/90"
                    >
                        {editId !== null ? "Изменить" : "Добавить"}
                    </button>
                    {editId !== null && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditId(null);
                                setName("");
                                setPopular(false);
                            }}
                            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                        >
                            Отменить
                        </button>
                    )}
                </div>
                <div>
                    <div>
                        <Label htmlFor="image">Изображение {editId && "(необязательно)"}</Label>
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                            className="w-full border px-3 py-2 rounded mt-2"
                            required={!editId}
                        />
                    </div>

                    {preview && (
                        <div>
                            <Label>Превью изображения</Label>
                            <img src={preview} alt="Preview" className="w-64 h-auto rounded border" />
                        </div>
                    )}
                </div>
            </form>

            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2 text-left">ID</th>
                        <th className="border px-4 py-2 text-left">Фото</th>
                        <th className="border px-4 py-2 text-left">Название</th>
                        <th className="border px-4 py-2 text-center">Популярность</th>
                        <th className="border px-4 py-2">Действия</th>
                    </tr>
                </thead>
                <tbody>
                {categories.map((category) => {
                    if (category.parentId !== null) return null;

                    return (
                        <React.Fragment key={category.id}>
                        <tr>
                            <td className="border px-4 py-2">{category.id}</td>
                            <td className="border px-4 py-2">
                            <Image
                                src={`${baseURL}/uploads/${category.image}`}
                                alt={category.name || "Alt"}
                                width={50}
                                height={50}
                                unoptimized
                            />
                            </td>
                            <td className="border px-4 py-2">{category.name}</td>
                            <td className="border px-4 py-2 text-center">
                            {category.popular ? "Yes" : "No"}
                            </td>
                            <td className="border px-4 py-2 text-center space-x-2">
                                <button
                                    onClick={() =>
                                    handleEdit(category.id ?? 0, category.name, category.popular)
                                    }
                                    className="text-blue-600 hover:underline"
                                >
                                    <Pencil size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(category.id ?? 0)}
                                    className="text-red-600 hover:underline"
                                >
                                    <Trash2 size={18} />
                                </button>
                                <button
                                    onClick={() => {
                                    setSelectedCategory(category.id ?? 0);
                                    setShowSubModal(true);
                                    }}
                                    className="text-green-600 hover:underline"
                                >
                                    Подкатегория
                                </button>
                            </td>
                        </tr>

                        {category.subcategories?.map((sub) => (
                            <tr key={sub.id} className="bg-gray-50">
                            <td className="border px-4 py-2 pl-12">↳ {sub.id}</td>
                            <td className="border px-4 py-2">
                                {sub.image && (
                                <Image
                                    src={`${baseURL}/uploads/${sub.image}`}
                                    alt={sub.name}
                                    width={50}
                                    height={50}
                                    unoptimized
                                />
                                )}
                            </td>
                            <td className="border px-4 py-2">{sub.name}</td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2 text-center" colSpan={2}>
                                <button
                                onClick={() => {
                                    setSubEditId(sub.id ?? 0);
                                    setSubName(sub.name);
                                    setSelectedCategory(category.id ?? 0);
                                    setShowSubModal(true);
                                }}
                                className="text-blue-600 hover:underline mr-2"
                                >
                                <Pencil size={16} />
                                </button>
                                <button
                                onClick={() => handleDeleteSub(sub.id ?? 0)}
                                className="text-red-600 hover:underline"
                                >
                                <Trash2 size={18} />
                                </button>
                            </td>
                            </tr>
                        ))}
                        </React.Fragment>
                    );
                })}
                </tbody>
            </table>
            {showSubModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-[400px] relative">
                    <h2 className="text-xl font-bold mb-4">
                        {subEditId ? "Редактировать подкатегорию" : "Добавить подкатегорию"}
                    </h2>

                    <form
                        onSubmit={async (e) => {
                        e.preventDefault();
                        if (!subName || !selectedCategory) return alert("Введите название");

                        const formData = new FormData();
                        formData.append("name", subName);
                        formData.append("parentId", String(selectedCategory));
                        if (subImageFile) formData.append("image", subImageFile);

                        try {
                            if (subEditId) {
                                await updateSubCategory(subEditId, formData);
                            } else {
                                await createSubCategory(formData);
                            }

                            setShowSubModal(false);
                            setSubName("");
                            setSubImageFile(null);
                            setSubEditId(null);
                            await fetchCategories();
                        } catch (err) {
                            console.error(err);
                            alert("Ошибка");
                        }
                        }}
                    >
                        <input
                        type="text"
                        value={subName}
                        onChange={(e) => setSubName(e.target.value)}
                        placeholder="Название подкатегории"
                        className="w-full border px-3 py-2 rounded mb-4"
                        />

                        <input
                        type="file"
                        onChange={(e) => setSubImageFile(e.target.files?.[0] || null)}
                        className="mb-4"
                        />

                        <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => {
                            setShowSubModal(false);
                            setSubEditId(null);
                            setSubName("");
                            setSubImageFile(null);
                            }}
                            className="px-4 py-2 bg-gray-400 text-white rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Сохранить
                        </button>
                        </div>
                    </form>
                    </div>
                </div>
            )}
        </div>
    );
}
