import { FC } from 'react';
import { PanelContentContainer, PanelHeaderContainer } from './panel.styles';
import { Navbar, Table } from '../../components';
import { CsvFileInput } from '../../components/csvFileInput/csvFileInput';


export const Panel: FC = () => {
	return (
		<>
			<PanelHeaderContainer>
				<Navbar />
			</PanelHeaderContainer>

			<PanelContentContainer>
				<CsvFileInput />
				<Table />
			</PanelContentContainer>
		</>
	);
};
