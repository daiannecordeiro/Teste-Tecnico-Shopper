import { useFetch } from './useFetch';

export function useProducts() {
	const { data, error, isLoading, refreshData } = useFetch('/products');

	return { products: data, isLoading, error, refreshData };
}
