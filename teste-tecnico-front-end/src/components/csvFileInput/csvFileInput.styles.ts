import styled from 'styled-components';

export const Container = styled.div`
	margin: 20px auto;
	text-align: center;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: end;
	width: 80vw;
`;

export const FileInput = styled.input`
	padding: 1rem;
	border: 2px solid #4aac78;
	border-radius: 1rem;
`;

export const UploadButton = styled.button<{
	isActive?: boolean
}>`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 10px 20px;
	background-color: ${({ isActive }) => (isActive ? '#4aac78' : '#ccc')};
	color: #fff;
	cursor: ${({ isActive }) => (isActive ? 'pointer' : 'not-allowed')};
	border-radius: 1rem;
	height: 66px;
	margin: 1rem;
	pointer-events:${({ isActive }) => (isActive ? 'auto' : 'none')};
	width: 8rem;
`;

export const StatusMessage = styled.span`
	margin-bottom: 2rem;
	font-weight: 400;
	text-align: right;
	width: 78vw;
`;
