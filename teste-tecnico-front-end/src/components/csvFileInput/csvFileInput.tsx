import { FC, useState } from 'react';
import { Container, FileInput, UploadButton, StatusMessage } from './csvFileInput.styles';
import { AlteredProductsTable } from '../';
import axios from 'axios';

export const CsvFileInput: FC = () => {
  const [message, setMessage] = useState<string>();
  const [file, setFile] = useState<File | null>(null);
  const [isButtonActive, setIsButtonActive] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleValidation = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await axios.post('http://localhost:3333/products/verify-csv', formData);
        setData(res.data);
        console.log(res.data.result);
        setIsButtonActive(res.data.isUpdateAuthorized);
        setMessage(res.data.isUpdateAuthorized
          ? 'Alteração autorizada! Confira os dados e clique em ATUALIZAR.'
          : 'Alteração não autorizada! Confira os dados, faça o upload de um arquivo .csv atualizado e clique em VALIDAR.');
      } catch (err) {
        setMessage('Erro ao fazer upload do arquivo.');
        console.error('Erro ao fazer upload do arquivo:', err);
      }
    } else {
      setMessage('Selecione um arquivo CSV antes de fazer o upload.');
    }
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        await axios.post('http://localhost:3333/products/update-prices-by-csv', formData);
        setMessage('Upload bem-sucedido! Faça o upload de um novo arquivo para atualizar os preços.');
        setData([]);
        setFile(null);
      } catch (err) {
        setMessage('Erro ao fazer upload do arquivo.');
        console.error('Erro ao fazer upload do arquivo:', err);
      }
    } else {
      setMessage('Selecione um arquivo CSV antes de fazer o upload.');
    }
  };

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
      {data.result && <AlteredProductsTable data={data.result} />}
      {message && <StatusMessage>{message}</StatusMessage>}
    </>
  );
};
