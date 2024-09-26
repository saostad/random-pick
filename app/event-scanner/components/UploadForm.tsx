"use client";

import { useState } from 'react';
import { uploadFile } from '../actions/uploadFile';

export type ApiResponse = {
  success: boolean;
  modelResponse: string;
}

type Props = {
  setResponse: (response: ApiResponse) => void;
}

export default function UploadForm({ setResponse }: Props) {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const result = await uploadFile(formData);
      setResponse(result);
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error('Upload failed:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        className="file-input file-input-bordered file-input-primary w-full max-w-xs"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button className="btn btn-outline btn-primary m-4" type="submit">Upload</button>
    </form>
  );
}