import { FC, useCallback, useState } from 'react';
import { Container, FileInput, UploadButton, StatusMessage } from './csvFileInput.styles';

export const CsvFileInput: FC = () => {
	const [status, setStatus] = useState<string | null>(null);

	const onFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files && e.target.files[0];

		if (file && file.type === 'text/csv') {
			const formData = new FormData();
			formData.append('csvFile', file);
		} else {
			setStatus('Selecione um arquivo CSV válido.');
		}
	}, []);

	return (
		<Container>
			<FileInput type="file" accept=".csv" onChange={onFileChange} />
			<UploadButton htmlFor="fileInput">VALIDAR CSV</UploadButton>
			{status && <StatusMessage>{status}</StatusMessage>}
		</Container>
	);
};
