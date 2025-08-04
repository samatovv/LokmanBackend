'use client';

import { useEffect } from "react";
import { useUserStore } from "../model/store";
import { UserState } from "../type";
import { Trash2, Pencil } from 'lucide-react';
import Link from "next/link";
import { Plus } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function Users() {
    const { fetchUsers, users, deleteUser } = useUserStore();
    const router = useRouter();

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleDelete = (id: number) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            deleteUser(id);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Пользователи</h1>
                <Link href="/manager/users/add" className="bg-[#15A8E3] text-white px-4 py-2 rounded">
                    <Plus size={16} />
                </Link>
            </div>

            {users.length === 0 ? (
                <p className="text-gray-500">Нет пользователей</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded shadow">
                        <thead>
                            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                                <th className="px-4 py-2">ID</th>
                                <th className="px-4 py-2">Login</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Номер тел</th>
                                <th className="px-4 py-2">Имя</th>
                                <th className="px-4 py-2">Фамилия</th>
                                <th className="px-4 py-2">Роль</th>
                                <th className="px-4 py-2">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user: UserState, index) => (
                                <tr key={user.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                    <td className="px-4 py-2">{user.id}</td>
                                    <td className="px-4 py-2">{user.login}</td>
                                    <td className="px-4 py-2">{user.email}</td>
                                    <td className="px-4 py-2">{user.phone}</td>
                                    <td className="px-4 py-2">{user.firstName}</td>
                                    <td className="px-4 py-2">{user.lastName}</td>
                                    <td className="px-4 py-2 capitalize">{user.role}</td>
                                    <td className="px-4 py-2 flex space-x-2">
                                        <button
                                            onClick={() => user.id && handleDelete(user.id)}
                                            className="text-red-500 hover:text-red-700"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => router.push(`/manager/users/edit/${user.id}`)}
                                            className="text-blue-500 hover:text-blue-700"
                                            title="Edit"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
