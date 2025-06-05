import Products from '@/features/Products/ui';
import { Suspense } from 'react';

export default function ProductPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Products />
    </Suspense>
  );
}
