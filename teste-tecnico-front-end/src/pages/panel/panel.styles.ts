import styled from 'styled-components';

export const PanelHeaderContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	background-color: #1E2044;
	box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.25);
	z-index: 100;
	width: 100vw;
`;

export const PanelContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	overflow-x: hidden;
	padding-top: 10rem;
`;
