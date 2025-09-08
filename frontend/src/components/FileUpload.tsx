import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { nanoid } from 'nanoid';
import localforage from 'localforage';
import toast from 'react-hot-toast';

import { useAppStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { UploadCloud } from 'lucide-react';

export function FileUpload() {
  const { setUploadedFile, setStatus, status } = useAppStore();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      toast.error('No valid files were provided.');
      return;
    }

    const file = acceptedFiles[0];

    if (file.type !== 'image/png') {
      toast.error('Invalid file type. Please upload a PNG image.');
      return;
    }

    const fileId = nanoid();

    try {
      // The setUploadedFile action will handle setting the correct status
      await localforage.setItem(fileId, file);
      toast.success('File stored locally! Starting processing...');
      setUploadedFile(fileId);
    } catch (error) {
      console.error('Failed to save file to localforage:', error);
      toast.error('Failed to store file. Please try again.');
      setStatus('error');
    }
  }, [setUploadedFile, setStatus]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/png': ['.png'] },
    multiple: false,
  });

  const isProcessing = status !== 'idle' && status !== 'error';

  return (
    <Card
      {...getRootProps()}
      className={`border-2 border-dashed transition-colors ${
        isDragActive ? 'border-primary' : 'border-gray-300 dark:border-gray-700'
      } ${isProcessing ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:border-primary/80'}`}
    >
      <CardContent className="flex flex-col items-center justify-center p-12 text-center">
        <input {...getInputProps()} disabled={isProcessing} />
        <UploadCloud className="mb-4 h-12 w-12 text-gray-400" />
        {isProcessing ? (
          <p className="font-semibold">Processing your file...</p>
        ) : isDragActive ? (
          <p className="font-semibold">Drop the file here ...</p>
        ) : (
          <div>
            <p className="font-semibold">Drag & drop a PNG file here, or click to select</p>
            <p className="text-sm text-gray-500">Max 25MB</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
