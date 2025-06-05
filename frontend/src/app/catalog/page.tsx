import CatalogClient from './CatalogClient';
import { Suspense } from 'react';

export default function CatalogPage() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <CatalogClient />
    </Suspense>
  );
}
