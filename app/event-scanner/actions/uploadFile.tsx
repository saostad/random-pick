"use server";

import { antropicImageAnalysis } from "../utils/antropic";

export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) {
    throw new Error("No file uploaded");
  }

  // Check if the file is an image
  if (!file.type.startsWith("image/")) {
    throw new Error("Uploaded file is not an image");
  }

  // List of allowed image types
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

  // Check if the image type is allowed
  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      `Unsupported image type: ${
        file.type
      }. Allowed types are: ${allowedTypes.join(", ")}`
    );
  }

  const imageType: "image/jpeg" | "image/png" | "image/gif" = file.type as any;

  // Read the file as an ArrayBuffer
  const arrayBuffer = await file.arrayBuffer();

  // Convert ArrayBuffer to Buffer
  const buffer = Buffer.from(arrayBuffer);

  // Convert Buffer to Base64 string
  const base64String = buffer.toString("base64");

  const modelResponse = await antropicImageAnalysis({
    imageBase64: base64String,
    imageType,
  });

  // Here you can do whatever you want with the base64Image
  // For example, you could save it to a database or return it to the client

  return { success: true, modelResponse };
}
