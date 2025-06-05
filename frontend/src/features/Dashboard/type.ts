export interface ProductAnalyticsRes {
    newProductsCount: number;
    totalQuantity: number;
    totalValue: number;
    mostExpensiveProduct: {
      name: string;
      price: number;
    } | null;
    cheapestProduct: {
      name: string;
      price: number;
    } | null;
    newestProduct: {
      name: string;
      createdAt: string;
    } | null;
    oldestProduct: {
      name: string;
      createdAt: string;
    } | null;
  
    newProductsByDay?: Array<{
      date: string;  // дата в формате 'YYYY-MM-DD'
      count: number; // количество новых товаров в этот день
    }>;
  }
  