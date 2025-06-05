'use client';

import { useUserStore } from "@/features/Users/model/store";
import { Container } from "@/shared/helpers/Container";

export default function ProfilePage() {
  const { profile } = useUserStore();

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <Container>
      <div className="w-full mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl">
        <h1 className="text-2xl font-bold text-[#184363] mb-6">My Profile</h1>

        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="text-lg text-[#184363] font-medium">{profile.firstName}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg text-[#184363] font-medium">{profile.email}</p>
          </div>

          {profile.phone && (
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-lg text-[#184363] font-medium">{profile.phone}</p>
            </div>
          )}

          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="text-lg text-[#184363] font-medium capitalize">{profile.role}</p>
          </div>
        </div>
      </div>
    </Container>
  );
}
