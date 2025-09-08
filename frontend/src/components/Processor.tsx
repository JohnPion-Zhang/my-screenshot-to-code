import { useEffect } from 'react';
import toast from 'react-hot-toast';

import { useAppStore } from '@/lib/store';
import { performOCR } from '@/lib/ocr';
import { generateGraphFromText } from '@/lib/ai';

export function Processor() {
  const { status, uploadedFileId, setStatus, setError, setOcrProgress, setGraphData } = useAppStore();

  useEffect(() => {
    if (status !== 'processing-ocr' || !uploadedFileId) {
      return;
    }

    const processPipeline = async () => {
      let currentToastId: string | undefined;

      try {
        currentToastId = toast.loading('Step 1/2: Extracting text from image...');
        setOcrProgress(0);
        const extractedText = await performOCR(uploadedFileId);
        toast.success('Text extracted!', { id: currentToastId });

        setStatus('processing-graph');
        currentToastId = toast.loading('Step 2/2: Generating knowledge graph...');
        const graphObject = await generateGraphFromText(extractedText);

        setGraphData(graphObject);
        toast.success('Graph generated successfully!', { id: currentToastId });

      } catch (error) {
        console.error('Processing pipeline failed:', error);
        const message = error instanceof Error ? error.message : 'An unknown error occurred.';
        setError(`Pipeline Failed: ${message}`);

        if (currentToastId) {
          toast.error('Could not complete processing.', { id: currentToastId });
        } else {
          toast.error('Could not complete processing.');
        }
      }
    };

    processPipeline();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, uploadedFileId]);

  return null;
}
