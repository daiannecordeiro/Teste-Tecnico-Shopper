import { FC } from 'react';
import { Container, FileInput, UploadButton, StatusMessage } from './csvFileInput.styles';
import { AlteredProductsTable, LoadingSpinner } from '../';
import { useProcessCsvFile } from '../../hooks/useProcessCsvFile';

export const CsvFileInput: FC = () => {
  const {
    message,
    isButtonActive,
    data,
    handleFileChange,
    handleValidation,
    handleUpload,
    isValidating,
  } = useProcessCsvFile();

  return (
    <>
      <Container>
        <FileInput type="file" accept=".csv" onChange={handleFileChange} />
        <UploadButton isActive={true} onClick={handleValidation}>
          VALIDAR
        </UploadButton>
        <UploadButton isActive={isButtonActive} onClick={handleUpload}>
          ATUALIZAR
        </UploadButton>
      </Container>
      {isValidating && <LoadingSpinner/>}
      {data?.result && <AlteredProductsTable data={data.result} />}
      {message && <StatusMessage>{message}</StatusMessage>}
    </>
  );
};
