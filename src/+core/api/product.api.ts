import axiosInstance from './api.instance';

export const productApi = {
  getProducts: async (params?: Record<string, any>) => {
    try {
      const response = await axiosInstance.get('/products', {
        params,
      });

      return response;
    } catch (error) {
      throw error;
    }
  },

  getProductById: async (id: string, params?: Record<string, any>) => {
    try {
      const response: any = await axiosInstance.get<any[]>(`/products/${id}`, {
        params,
      });

      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default productApi;
