import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppStore } from "@/lib/store";
import { Roadmap } from "./Roadmap";
import { GraphView } from "./GraphView";
import { NodeDetails } from "./NodeDetails";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";

export function ResultsView() {
  const { graphData, selectedStepId, setSelectedStepId, selectedNodeId, setSelectedNodeId } = useAppStore();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const currentNodeParam = searchParams.get('node');
    if (selectedNodeId && selectedNodeId !== currentNodeParam) {
      setSearchParams({ node: selectedNodeId }, { replace: true });
    } else if (!selectedNodeId && currentNodeParam) {
      searchParams.delete('node');
      setSearchParams(searchParams, { replace: true });
    }
  }, [selectedNodeId, searchParams, setSearchParams]);

  useEffect(() => {
    const nodeFromUrl = searchParams.get('node');
    if (nodeFromUrl && nodeFromUrl !== selectedNodeId) {
      setSelectedNodeId(nodeFromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!graphData) {
    return (
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>No Graph Data</AlertTitle>
        <AlertDescription>
          Something went wrong, and the graph data is not available. Please try uploading a new file.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="w-full space-y-8">
      <NodeDetails />
      <div>
        <h2 className="text-2xl font-semibold text-center mb-4">Exploration Roadmap</h2>
        <Roadmap
          roadmap={graphData.roadmap}
          onStepSelect={setSelectedStepId}
          selectedStepId={selectedStepId}
        />
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-center mb-4">Knowledge Graph</h2>
        <GraphView
          graphData={graphData.graph}
          selectedStepId={selectedStepId}
        />
      </div>
    </div>
  );
}
