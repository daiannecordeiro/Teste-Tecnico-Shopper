import styled from 'styled-components';

export const TableContainer = styled.table`
	width: 80vw;
	padding: 1rem 3rem;
	color: #fff;
	border-collapse: collapse;
	border-radius: 0.5rem;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  border: 4px solid #4aac78;
`;

export const TableHeader = styled.thead`
	background-color: #4aac78;
	color: #fff;

	th {
		background-color: #4aac78;
    padding: 1rem 3rem;
    text-align: left;
	}
`;

export const TableData = styled.tbody`
	text-align: left;
	td {
		padding: 1rem 3rem;
		border-bottom: 2px solid #4aac78;
    color: #1E2044
	}
`;
