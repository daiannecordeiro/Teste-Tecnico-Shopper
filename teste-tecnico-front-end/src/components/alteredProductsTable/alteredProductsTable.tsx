import { FC } from 'react';
import { TableHeader, TableContainer, TableData } from './alteredProductsTable.styles';
import { formatCurrency } from '../../utils/formatCurrency';

interface IAlteredProducts {
	code: number | string;
	name: string;
	cost_price: number;
	old_sales_price: number;
	new_sales_price: number;
	message: string;
	success: boolean;
	isPack: boolean;
	isPartOfPack: boolean;
}

interface IProps {
	data: IAlteredProducts[];
}

export const AlteredProductsTable: FC<IProps> = ({ data }) => {
	return (
		<TableContainer>
			<TableHeader>
				<tr>
					<th>Código</th>
					<th>Nome</th>
					<th>Custo</th>
					<th>Preço de Venda Anterior</th>
					<th>Preço de Venda Novo</th>
					<th>Mensagem</th>
				</tr>
			</TableHeader>
			<TableData>
				{data.map((item: IAlteredProducts) => (
					<tr key={item.code}>
						<td>{item.code}</td>
						<td>{item.name}</td>
						<td>{formatCurrency(item.cost_price)}</td>
						<td>{formatCurrency(item.old_sales_price)}</td>
						<td>{formatCurrency(item.new_sales_price)}</td>
						<td>{item.message}</td>
					</tr>
				))}
			</TableData>
		</TableContainer>
	);
};
