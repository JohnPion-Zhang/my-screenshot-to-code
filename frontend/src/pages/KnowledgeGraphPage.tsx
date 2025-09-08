import { FileUpload } from "@/components/FileUpload";
import { Processor } from "@/components/Processor";
import { ResultsView } from "@/components/ResultsView";
import { useAppStore } from "@/lib/store";

function StatusDisplay() {
  const { status, ocrProgress } = useAppStore();
  return (
    <div className="text-center p-8">
      <h2 className="text-xl font-semibold mb-2">Processing File...</h2>
      <p>Current Status: <span className="font-mono bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">{status}</span></p>
      {status === 'processing-ocr' && (
        <div className="w-full max-w-xs mx-auto mt-4">
          <p>OCR Progress: {Math.round(ocrProgress * 100)}%</p>
        </div>
      )}
    </div>
  );
}

function KnowledgeGraphPage() {
  const status = useAppStore((state) => state.status);

  let content;
  switch (status) {
    case 'idle':
    case 'error':
      content = <div className="max-w-2xl mx-auto"><FileUpload /></div>;
      break;
    case 'success':
      content = <ResultsView />;
      break;
    default:
      content = <StatusDisplay />;
      break;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Processor />
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Knowledge Graph Visualizer</h1>
        <p className="text-lg text-muted-foreground mt-2">
          {status === 'idle' || status === 'error'
            ? 'Upload an image (PNG) to extract concepts and visualize them as a graph.'
            : 'Explore the generated knowledge graph below.'}
        </p>
      </div>

      {content}
    </div>
  );
}

export default KnowledgeGraphPage;
