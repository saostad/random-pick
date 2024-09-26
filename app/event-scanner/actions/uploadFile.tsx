"use server";

import { antropicImageAnalysis } from "../utils/antropic";

export async function uploadFile(formData: FormData) {
  const file = formData.get('file') as File;
  if (!file) {
    throw new Error('No file uploaded');
  }

  // Read the file as an ArrayBuffer
  const arrayBuffer = await file.arrayBuffer();
  
  // Convert ArrayBuffer to Buffer
  const buffer = Buffer.from(arrayBuffer);
  
  // Convert Buffer to Base64 string
  const base64String = buffer.toString('base64');
  
  const modelResponse = await antropicImageAnalysis(base64String)


  // Here you can do whatever you want with the base64Image
  // For example, you could save it to a database or return it to the client

  return { success: true, modelResponse };
}