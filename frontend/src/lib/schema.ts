import { z } from 'zod';

const FileMetadataSchema = z.object({
  name: z.string(),
  size: z.number(),
  type: z.string(),
});

const ProcessingMetadataSchema = z.object({
  ocrTimestamp: z.string().datetime({ message: "Invalid datetime string" }),
  llmTimestamp: z.string().datetime({ message: "Invalid datetime string" }),
  llmProvider: z.string(),
});

const MetadataSchema = z.object({
  sourceFile: FileMetadataSchema,
  processing: ProcessingMetadataSchema,
});

const RoadmapStepSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
});

const RoadmapSchema = z.object({
  mermaid: z.string(),
  steps: z.array(RoadmapStepSchema),
});

const ProvenanceSchema = z.object({
  file: z.string(),
  region: z.object({
    x: z.number(),
    y: z.number(),
    width: z.number(),
    height: z.number(),
  }).optional(),
});

const GraphNodeSchema = z.object({
  id: z.string(),
  stepId: z.string(),
  label: z.string(),
  type: z.string(),
  summary: z.string(),
  keyFacts: z.array(z.string()),
  provenance: ProvenanceSchema,
});

const GraphEdgeSchema = z.object({
  id: z.string(),
  stepId: z.string(),
  from: z.string(),
  to: z.string(),
  label: z.string(),
  summary: z.string(),
});

const GraphDataSchema = z.object({
  nodes: z.array(GraphNodeSchema),
  edges: z.array(GraphEdgeSchema),
});

export const FullResponseSchema = z.object({
  metadata: MetadataSchema,
  roadmap: RoadmapSchema,
  graph: GraphDataSchema,
});

export type FullResponseType = z.infer<typeof FullResponseSchema>;
