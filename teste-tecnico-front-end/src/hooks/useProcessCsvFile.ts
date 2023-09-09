import axios from "axios";
import { useState } from "react";
import useSWR from "swr";

export const useProcessCsvFile = () => {
  const [message, setMessage] = useState<string>();
  const [file, setFile] = useState<File | null>(null);
  const [isButtonActive, setIsButtonActive] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const { data, error, isValidating, mutate } = useSWR(
    file ? 'http://localhost:3333/products/verify-csv' : null,
    async () => {
      if (!file) {
        return null;
      }

      const formData = new FormData();
      formData.append('file', file as Blob);

      const response = await axios.post('http://localhost:3333/products/verify-csv', formData);
      return response.data;
    }
  );

  const handleValidation = async () => {
    if (file) {
      try {
        await mutate();
        setIsButtonActive(data.isUpdateAuthorized);
        setMessage(data.isUpdateAuthorized
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
      formData.append('file', file as Blob);

      try {
        await axios.post('http://localhost:3333/products/update-prices-by-csv', formData);
        setMessage('Upload bem-sucedido! Faça o upload de um novo arquivo para atualizar os preços.');
        setFile(null);
      } catch (err) {
        setMessage('Erro ao fazer upload do arquivo.');
        console.error('Erro ao fazer upload do arquivo:', err);
      }
    } else {
      setMessage('Selecione um arquivo CSV antes de fazer o upload.');
    }
  };

  return {
    message,
    file,
    isButtonActive,
    data,
    handleFileChange,
    handleValidation,
    handleUpload,
    isLoading: !error && !data,
    isError: error,
    isValidating,
  };
};
