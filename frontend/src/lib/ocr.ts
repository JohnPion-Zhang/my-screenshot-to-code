import Tesseract from 'tesseract.js';
import localforage from 'localforage';
import { useAppStore } from './store';

export async function performOCR(fileId: string): Promise<string> {
  const file = await localforage.getItem<File>(fileId);
  if (!file) {
    throw new Error(`File with ID "${fileId}" not found in local storage.`);
  }

  const worker = await Tesseract.createWorker('eng', 1, {
    logger: (m) => {
      if (m.status === 'recognizing text') {
        useAppStore.getState().setOcrProgress(m.progress);
      }
    },
  });

  try {
    const { data: { text } } = await worker.recognize(file);
    return text;
  } catch (error) {
    console.error("Tesseract recognition failed:", error);
    throw new Error("Failed to recognize text in the image.");
  } finally {
    await worker.terminate();
  }
}
