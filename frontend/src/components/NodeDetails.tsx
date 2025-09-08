import { useMemo } from 'react';
import { useAppStore } from '@/lib/store';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function NodeDetails() {
  const { graphData, selectedNodeId, setSelectedNodeId } = useAppStore();

  const selectedNode = useMemo(() => {
    if (!selectedNodeId || !graphData) return null;
    return graphData.graph.nodes.find(node => node.id === selectedNodeId);
  }, [selectedNodeId, graphData]);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedNodeId(null);
    }
  };

  if (!selectedNode) {
    return null;
  }

  return (
    <Sheet open={!!selectedNodeId} onOpenChange={handleOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-2xl">{selectedNode.label}</SheetTitle>
          <SheetDescription>
            <Badge variant="outline">{selectedNode.type}</Badge>
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Summary</h3>
            <p className="text-sm text-muted-foreground">{selectedNode.summary}</p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Key Facts</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {selectedNode.keyFacts.map((fact, index) => (
                <li key={index}>{fact}</li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Source Provenance</h3>
            <div className="text-sm text-muted-foreground">
              <p>File: <span className="font-mono">{selectedNode.provenance.file}</span></p>
              {selectedNode.provenance.region && (
                <p>Region (x, y, w, h): <span className="font-mono">
                  {selectedNode.provenance.region.x}, {selectedNode.provenance.region.y}, {selectedNode.provenance.region.width}, {selectedNode.provenance.region.height}
                </span></p>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
