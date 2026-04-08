import { apiClient } from './api';
import type { Product, ProductCategory } from '../types/product';

export async function fetchProducts(): Promise<Product[]> {
  const response = await apiClient.get<Product[]>('/products');
  return response.data;
}

export async function fetchProductById(productId: number): Promise<Product> {
  const response = await apiClient.get<Product>(`/products/${productId}`);
  return response.data;
}

export async function fetchCategories(): Promise<ProductCategory[]> {
  const response = await apiClient.get<ProductCategory[]>('/products/categories');
  return response.data;
}
