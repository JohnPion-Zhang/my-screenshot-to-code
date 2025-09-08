import Cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
import CytoscapeComponent from 'react-cytoscapejs';
import { useMemo } from 'react';
import type { FullResponseType } from '@/lib/schema';
import { useAppStore } from '@/lib/store';

Cytoscape.use(coseBilkent);

type GraphViewProps = {
  graphData: FullResponseType['graph'];
  selectedStepId: string | null;
};

export function GraphView({ graphData, selectedStepId }: GraphViewProps) {
  const { setSelectedNodeId } = useAppStore();

  const elements = useMemo(() => {
    if (!selectedStepId) {
      return [];
    }

    const nodes = graphData.nodes
      .filter(node => node.stepId === selectedStepId)
      .map(node => ({
        data: { id: node.id, label: node.label, type: node.type }
      }));

    const edges = graphData.edges
      .filter(edge => edge.stepId === selectedStepId)
      .map(edge => ({
        data: { source: edge.from, target: edge.to, label: edge.label }
      }));

    return CytoscapeComponent.normalizeElements([...nodes, ...edges]);
  }, [graphData, selectedStepId]);

  const stylesheet: Cytoscape.Stylesheet[] = [
    {
      selector: 'node',
      style: {
        'background-color': '#6366f1',
        'label': 'data(label)',
        'color': '#3f3f46',
        'fontSize': '12px',
        'text-valign': 'center',
        'text-halign': 'center',
        'width': 'label',
        'height': 'label',
        'padding': '10px',
        'shape': 'round-rectangle',
      } as Cytoscape.Css.Node,
    },
    {
      selector: 'edge',
      style: {
        'width': 2,
        'line-color': '#a1a1aa',
        'target-arrow-color': '#a1a1aa',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
        'label': 'data(label)',
        'fontSize': '10px',
        'color': '#71717a',
        'text-background-opacity': 1,
        'text-background-color': 'white',
      } as Cytoscape.Css.Edge,
    },
  ];

  return (
    <div className="w-full h-[600px] border rounded-lg overflow-hidden">
      <CytoscapeComponent
        elements={elements}
        style={{ width: '100%', height: '100%' }}
        stylesheet={stylesheet}
        layout={{
          name: 'cose-bilkent',
          animate: 'end',
          animationEasing: 'ease-out',
          animationDuration: 1000,
          randomize: true,
        }}
        cy={(cy: Cytoscape.Core) => {
          cy.on('tap', 'node', (event: Cytoscape.EventObject) => {
            const nodeId = event.target.id();
            setSelectedNodeId(nodeId);
          });
        }}
      />
    </div>
  );
}
