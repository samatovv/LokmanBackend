'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuthStore } from '../model/store';
import { LoginReq } from '../type';

export default function AuthLogin() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginReq>({
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const signIn = useAuthStore((state) => state.signIn);
  const loading = useAuthStore((state) => state.loading);
  const router = useRouter();

  const onSubmit = async (data: LoginReq) => {
    try {
      await signIn(data, router);
    } catch (error: unknown) {
      setError('login', {
        type: 'manual',
        message: 'Неверный логин или пароль',
      });
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ECF4F6]">
      <Card className="w-full max-w-md rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-[#15A8E3] text-2xl font-bold">
            Вход в систему
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="login"
                placeholder="Введите email"
                {...register('login', { required: 'Email обязателен' })}
              />
              {errors.login && (
                <p className="text-red-500 text-sm">{errors.login.message}</p>
              )}
            </div>
            <div className="grid gap-1">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="Введите пароль"
                {...register('password', { required: 'Пароль обязателен' })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-[#15A8E3] hover:bg-[#1395ca] text-white"
              disabled={loading}
            >
              {loading ? 'Загрузка...' : 'Войти'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
