import { create } from "zustand";
import { api } from "../api";
import { UserProfileType, UserState } from "../type";

type UserStoreState = {
    profile: UserProfileType | null
    fetchProfile: () => void
    users: UserState[]
    fetchUsers: () => void
    getUserById: (id: number) => Promise<UserState>
    deleteUser: (id: number) => void
    updateUser: (id: number, data: UserState) => void
    createUser: (data: UserState) => void
}

export const useUserStore = create<UserStoreState>((set) => ({
    profile: null,
    fetchProfile: async () => {
        try {
            const res = await api.getProfile();
            set({ profile: res.data });
        } catch (error) {
            console.error('Get profile error:', error);
        }
    },
    users: [],
    fetchUsers: async () => {
        try {
            const res = await api.getUsers();
            set({ users: res.data });
        } catch (error) {
            console.error('Get users error:', error);
        }
    },
    getUserById: async (id: number) => {
        try {
            const res = await api.getUserById(id);
            return res.data;
        } catch (error) {
            console.error('Get user by ID error:', error);
        }
    },
    deleteUser: async (id: number) => {
        try {
            await api.deleteUser(id);
            set((state) => ({
                users: state.users.filter(user => user.id !== id)
            }))
        } catch (error) {
            console.error('Delete user error:', error);
        }
    },
    updateUser: async (id: number, data: UserState) => {
        try {
            await api.updateUser(id, data);
            set((state) => ({
                users: state.users.map(user =>
                    user.id === id ? data : user
                )
            }))
        } catch (error) {
            console.error('Update user error:', error);
        }
    },
    createUser: async (data: UserState) => {
        try {
            await api.createUser(data);
            set((state) => ({
                users: [...state.users, data]
            }))
        } catch (error) {
            console.error('Create user error:', error);
        }
    }
}))