import { FC } from 'react';
import { PanelContentContainer, PanelHeaderContainer } from './panel.styles';
import { Navbar, Table } from '../../components';


export const Panel: FC = () => {
	return (
		<>
			<PanelHeaderContainer>
				<Navbar />
			</PanelHeaderContainer>

			<PanelContentContainer>
				<Table />
			</PanelContentContainer>
		</>
	);
};
