import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import type { FullResponseType } from '@/lib/schema';
import { nanoid } from 'nanoid';

type RoadmapProps = {
  roadmap: FullResponseType['roadmap'];
  onStepSelect: (stepId: string) => void;
  selectedStepId: string | null;
};

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    primaryColor: '#6366f1',
    primaryTextColor: '#ffffff',
    primaryBorderColor: '#6366f1',
    lineColor: '#a1a1aa',
    textColor: '#3f3f46',
  },
  flowchart: {
    useMaxWidth: true,
  },
});

export function Roadmap({ roadmap, onStepSelect, selectedStepId }: RoadmapProps) {
  const mermaidRef = useRef<HTMLDivElement>(null);
  const graphId = `mermaid-graph-${nanoid(6)}`;

  useEffect(() => {
    const renderMermaid = async () => {
      if (mermaidRef.current && roadmap.mermaid) {
        try {
          const { svg } = await mermaid.render(graphId, roadmap.mermaid);
          if (mermaidRef.current) {
            mermaidRef.current.innerHTML = svg;

            roadmap.steps.forEach(step => {
              const nodeElement = mermaidRef.current?.querySelector(`#${step.id}`);
              if (nodeElement) {
                nodeElement.classList.add('cursor-pointer');
                nodeElement.addEventListener('click', () => onStepSelect(step.id));

                const rect = nodeElement.querySelector('rect');
                if (rect) {
                  if (step.id === selectedStepId) {
                    rect.style.stroke = '#4f46e5';
                    rect.style.strokeWidth = '4px';
                  } else {
                    rect.style.stroke = '#6366f1';
                    rect.style.strokeWidth = '2px';
                  }
                }
              }
            });
          }
        } catch (error) {
          console.error('Mermaid rendering failed:', error);
        }
      }
    };
    renderMermaid();
  }, [roadmap, graphId, onStepSelect, selectedStepId]);

  return <div ref={mermaidRef} id="mermaid-container" className="w-full flex justify-center" />;
}
