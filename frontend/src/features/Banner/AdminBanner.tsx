/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useBannerStore } from "./model/store";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { baseURL } from "@/api";

export default function AdminBanner() {
  const { banners, fetchBanners, createBanner, updateBanner, deleteBanner } = useBannerStore();

  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  useEffect(() => {
    if (!imageFile) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(imageFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      await deleteBanner(id);
      await fetchBanners();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      alert("Введите заголовок.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      if (editId !== null) {
        await updateBanner(editId, formData);
      } else {
        if (!imageFile) {
          alert("Выберите изображение для нового баннера.");
          return;
        }
        await createBanner(formData);
      }

      setTitle('');
      setImageFile(null);
      setPreview(null);
      setEditId(null);
      await fetchBanners();
    } catch (err) {
      console.error("Ошибка при сохранении баннера:", err);
      alert("Произошла ошибка.");
    }
  };

  const handleEdit = (id: number, title: string) => {
    setEditId(id);
    setTitle(title);
    setImageFile(null);
    setPreview(null);
  };

  const handleCancel = () => {
    setEditId(null);
    setTitle('');
    setImageFile(null);
    setPreview(null);
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <Label htmlFor="title">Заголовок</Label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Введите заголовок"
            required
          />
        </div>

        <div>
          <Label htmlFor="image">Изображение {editId && "(необязательно)"}</Label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full border px-3 py-2 rounded"
            required={!editId}
          />
        </div>

        {preview && (
          <div>
            <Label>Превью изображения</Label>
            <img src={preview} alt="Preview" className="w-64 h-auto rounded border" />
          </div>
        )}

        <div className="flex gap-4">
          <Button type="submit">
            {editId ? "Сохранить изменения" : "Добавить баннер"}
          </Button>
          {editId && (
            <Button type="button" variant="outline" onClick={handleCancel}>
              Отмена
            </Button>
          )}
        </div>
      </form>

      <h2 className="text-xl font-semibold mb-4">Список баннеров</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {banners.map((item) => (
          <div key={item.id} className="border p-4 rounded shadow relative">
            <Image
              src={`${baseURL}/uploads/${item.image}`}
              alt={item.title}
              width={300}
              height={180}
              className="rounded mb-2 object-cover w-[320px] h-[300px]"
              unoptimized
            />
            <h3 className="text-lg font-medium">{item.title}</h3>
            <div className="absolute top-2 right-2 flex gap-2 bg-white p-3 rounded">
              <button
                className="text-blue-600 hover:text-blue-800"
                onClick={() => handleEdit(item.id, item.title)}
              >
                <Pencil size={18} />
              </button>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => handleDelete(item.id)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
