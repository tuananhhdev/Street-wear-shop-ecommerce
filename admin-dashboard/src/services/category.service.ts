import axiosClient from '@/lib/axios-client';

export const categoryService = {
  getCategories: async () => {
    axiosClient.get('/category');
  },

  addCategory: async () => {},

  updateCategory: async () => {},

  deleteCategory: async () => {},
};
