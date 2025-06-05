'use client';

import { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAnalyticsStore } from '../model/store';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

export default function Dashboard() {
  const { analytics, fetchAnalytics } = useAnalyticsStore();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (!analytics) return <p>Загрузка...</p>;

  const {
    totalValue,
    mostExpensiveProduct,
    cheapestProduct,
    newestProduct,
    oldestProduct,
    newProductsByDay = [
      { date: '2025-05-22', count: 2 },
      { date: '2025-05-23', count: 3 },
      { date: '2025-05-24', count: 1 },
      { date: '2025-05-25', count: 5 },
      { date: '2025-05-26', count: 4 },
      { date: '2025-05-27', count: 6 },
      { date: '2025-05-28', count: 3 },
    ],
  } = analytics;

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>График новых товаров за последние 7 дней</CardTitle>
        </CardHeader>
        <CardContent style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={newProductsByDay} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#15A8E3" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>💰 Общая стоимость</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalValue.toFixed(2)} $</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🔺 Самый дорогой товар</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{mostExpensiveProduct?.name} — {mostExpensiveProduct?.price} $</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🔻 Самый дешёвый товар</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{cheapestProduct?.name} — {cheapestProduct?.price} $</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🕓 Самый старый товар</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              {oldestProduct?.name} —{' '}
              {oldestProduct?.createdAt
                ? new Date(oldestProduct.createdAt).toLocaleDateString()
                : 'Дата отсутствует'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🆕 Самый новый товар</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              {newestProduct?.name} —{' '}
              {newestProduct?.createdAt
                ? new Date(newestProduct.createdAt).toLocaleDateString()
                : 'Дата отсутствует'}
            </p>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
