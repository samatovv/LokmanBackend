'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useUserStore } from "@/features/Users/model/store";
import { UserState } from "@/features/Users/type";

export default function EditUsers() {
    const { getUserById, updateUser } = useUserStore();
    const router = useRouter();
    const params = useParams();
    const userId = Number(params?.id);

    const [formData, setFormData] = useState<UserState | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUserById(userId);
            if (user) {
                setFormData(user);
            }
        };
        fetchUser();
    }, [userId, getUserById]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (formData) {
            setFormData((prev) => prev && { ...prev, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        console.log(formData);
        e.preventDefault();
        if (formData) {
            await updateUser(userId, formData);
            router.push("/manager/users");
        }
    };

    if (!formData) return <p className="p-6">Loading...</p>;

    return (
        <div className="w-full mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Редактировать пользователя</h1>
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
                {/* <div>
                    <label className="block mb-1 font-medium">Роль</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div> */}
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}
