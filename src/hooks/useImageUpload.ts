import { useState } from 'react';
import axios from 'axios';

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectImageFile = async (): Promise<string> => {
    const file = await selectImageFile();
    if (!file) return '';
    return await uploadImageToCDN(file);
  };

  const selectImageFile = (): Promise<File | null> => {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.multiple = false;
      input.onchange = (event: Event) => {
        const file = (event.target as HTMLInputElement).files?.[0] || null;
        console.log('Selected file:', file);
        resolve(file);
      };
      input.click();
    });
  };

  const uploadImageToCDN = async (file: File): Promise<string> => {
    try {
      setIsUploading(true);
      const response = await axios.post('/upload', { file });
      return response.data.url;
    } catch (err) {
      setError('Failed to upload image to CDN');
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    isUploading,
    error,
    handleSelectImageFile,
  };
};
