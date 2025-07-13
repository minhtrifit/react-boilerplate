import { useEffect, useState } from 'react';
import productApi from '@/+core/api/product.api';

export const useGetProducts = (params?: Record<string, any>) => {
  const [products, setProducts] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const handleGetProduct = async (params?: Record<string, any>) => {
    try {
      setLoading(true);

      const response: any = await productApi.getProducts(params);

      console.log('Get products successfully:', response);

      setProducts(response?.data);
      setTotal(response?.data?.length);

      return true;
    } catch (err: any) {
      console.log('Get products failed:', err);

      setError(err.message || 'Lỗi không xác định');

      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetProduct(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)]);

  return {
    data: products,
    total,
    loading,
    error,
  };
};
