'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/features/Users/model/store";

export default function AddUsers() {
    const { createUser } = useUserStore();
    const router = useRouter();

    const [formData, setFormData] = useState({
        login: "",
        password: "",
        email: "",
        phone: "",
        firstName: "",
        lastName: "",
        role: "user",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createUser(formData);
        router.push("/admin/users");
    };

    return (
        <div className="w-full mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Добавить пользователя</h1>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded p-6">
                <div>
                    <label className="block mb-1 font-medium">Логин</label>
                    <input
                        name="login"
                        value={formData.login}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Пароль</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Тел номер</label>
                    <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Имя</label>
                    <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Фамилия</label>
                    <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                    Добавить
                </button>
            </form>
        </div>
    );
}
