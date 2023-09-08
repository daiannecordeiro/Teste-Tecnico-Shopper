import { FC } from 'react';
import { SpinnerContainer, SpinnerCircle } from './loadingSpiner.styles';

export const LoadingSpinner: FC = () => {
	return (
		<SpinnerContainer>
			<SpinnerCircle />
		</SpinnerContainer>
	);
};
