"use client";

import { useState, useEffect } from "react";
import { uploadFile } from "../actions/uploadFile";
import Image from "next/image";
import z from "zod";

const ApiResponseSchema = z.object({
  success: z.boolean(),
  modelResponse: z.string(),
});

export type ApiResponse = z.infer<typeof ApiResponseSchema>;

type Props = {
  setResponse: (response: ApiResponse) => void;
};

export default function UploadForm({ setResponse }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // Free memory when component is unmounted
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || isLoading) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await uploadFile(formData);
      // check if the response is in JSON format
      if (result.success && result.modelResponse) {
        setResponse(result);
      }

      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error("Upload failed:", error);
      // Handle error (e.g., show an error message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <div className="mb-4">
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          className="file-input file-input-bordered file-input-primary w-full max-w-xs"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          disabled={isLoading}
        />
      </div>
      {previewUrl && (
        <div className="mb-4">
          <Image
            src={previewUrl}
            alt="Preview"
            width={320}
            height={256}
            className="object-contain"
          />
        </div>
      )}
      <button
        className={`btn btn-outline btn-primary ${isLoading ? "loading" : ""}`}
        type="submit"
        disabled={!file || isLoading}
      >
        {isLoading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}
