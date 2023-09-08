import styled from 'styled-components';

export const Container = styled.div`
	margin: 20px auto;
	text-align: center;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
  width: 80vw;
`;

export const FileInput = styled.input`
	padding: 1rem;
	border: 2px solid #4aac78;
	border-radius: 1rem;
`;

export const UploadButton = styled.label`
	display: flex;
  align-items: center;
  justify-content: center;
	padding: 10px 20px;
	background-color: #4aac78;
	color: #fff;
	cursor: pointer;
	border-radius: 1rem;
  height: 66px;
	margin: 1rem;
`;

export const StatusMessage = styled.div`
	margin-top: 10px;
	font-weight: bold;
`;
