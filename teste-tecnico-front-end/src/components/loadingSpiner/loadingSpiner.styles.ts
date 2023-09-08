import styled from 'styled-components';

export const SpinnerContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 50vh;
	width: 50vw;
`;

export const SpinnerCircle = styled.div`
	width: 100px;
	height: 100px;
	border: 10px solid #4aac78;
	border-top: 10px solid transparent;
	border-radius: 50%;
	animation: spin 1500ms linear infinite;

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
