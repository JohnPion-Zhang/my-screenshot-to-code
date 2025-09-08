import type { FullResponseType } from '../lib/schema';

export const mockGraphData: FullResponseType = {
  metadata: {
    sourceFile: {
      name: "example.png",
      size: 1234567,
      type: "image/png"
    },
    processing: {
      ocrTimestamp: "2025-09-07T10:30:00.000Z",
      llmTimestamp: "2025-09-07T10:30:05.000Z",
      llmProvider: "mock-gemini-2.5-flash-lite"
    }
  },
  roadmap: {
    mermaid: "flowchart TD\\n  A[Introduction] --> B(Core Concepts);\\n  B --> C{Key Relationships};\\n  C --> D[Case Study: Example X];\\n  D --> E[Conclusion & Summary];",
    steps: [
      { "id": "A", "title": "Introduction", "description": "An overview of the document's main topic." },
      { "id": "B", "title": "Core Concepts", "description": "Defines the fundamental ideas and terms." },
      { "id": "C", "title": "Key Relationships", "description": "Explores how the core concepts interact." },
      { "id": "D", "title": "Case Study: Example X", "description": "A practical application of the concepts." },
      { "id": "E", "title": "Conclusion & Summary", "description": "A review of the key takeaways." }
    ]
  },
  graph: {
    nodes: [
      {
        id: "node-001",
        stepId: "B",
        label: "Machine Learning",
        type: "Concept",
        summary: "A field of artificial intelligence that uses statistical techniques to give computer systems the ability to 'learn' from data.",
        keyFacts: [
          "Subset of AI.",
          "Involves algorithms and statistical models.",
          "Can be supervised, unsupervised, or reinforcement."
        ],
        provenance: {
          file: "example.png",
          region: { "x": 50, "y": 100, "width": 400, "height": 150 }
        }
      },
      {
        id: "node-002",
        stepId: "B",
        label: "Supervised Learning",
        type: "Concept",
        summary: "A subcategory of machine learning where the model is trained on labeled data.",
        keyFacts: [
          "Requires input and desired output data.",
          "Used for classification and regression tasks."
        ],
        provenance: {
          file: "example.png",
          region: { "x": 60, "y": 250, "width": 380, "height": 100 }
        }
      },
      {
        id: "node-003",
        stepId: "C",
        label: "Classification",
        type: "Task",
        summary: "The problem of identifying to which of a set of categories a new observation belongs.",
        keyFacts: [
          "A type of supervised learning.",
          "Examples: Spam detection, image recognition."
        ],
        provenance: {
          file: "example.png",
          region: { "x": 65, "y": 350, "width": 370, "height": 80 }
        }
      }
    ],
    edges: [
      {
        id: "edge-001",
        stepId: "C",
        from: "node-002",
        to: "node-001",
        label: "is a type of",
        summary: "Supervised Learning is a primary approach within the broader field of Machine Learning."
      },
      {
        id: "edge-002",
        stepId: "C",
        from: "node-003",
        to: "node-002",
        label: "is an example of",
        summary: "Classification is a common task performed using Supervised Learning techniques."
      }
    ]
  }
};
