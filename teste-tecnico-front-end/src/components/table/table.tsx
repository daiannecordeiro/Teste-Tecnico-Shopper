import { FC, useState, useEffect } from 'react';
import { TableHeader, TableContainer, TableData } from './table.styles';
import { useProducts } from '../../hooks/useProducts';
import { LoadingSpinner } from '..';
import { formatCurrency } from '../../utils/formatCurrency';
import { useCheckApi } from '../../hooks/useCheckApi';

export const Table: FC = () => {
	interface IProduct {
		code: number;
		name: string;
		cost_price: number;
		sales_price: number;
	}

	const { products, isLoading, error } = useProducts();
	const [showSpinner, setShowSpinner] = useState(true);

	useEffect(() => {
		const delay = setTimeout(() => {
			setShowSpinner(false);
		}, 2000);

		return () => clearTimeout(delay);
	}, []);

	if (showSpinner || isLoading) {
		return <LoadingSpinner />;
	}

	if (error) {
		setShowSpinner(true);
		setTimeout(() => {
			setShowSpinner(false);
		}, 4000);
		return <p>Erro ao carregar dados</p>;
	}

	return (
		<TableContainer>
			<TableHeader>
				<tr>
					<th>Código</th>
					<th>Nome</th>
					<th>Custo</th>
					<th>Preço de Venda</th>
				</tr>
			</TableHeader>
			<TableData>
				{products.map((product: IProduct) => (
					<tr key={product.code}>
						<td>{product.code}</td>
						<td>{product.name}</td>
						<td>{formatCurrency(product.cost_price)}</td>
						<td>{formatCurrency(product.sales_price)}</td>
					</tr>
				))}
			</TableData>
		</TableContainer>
	);
};
