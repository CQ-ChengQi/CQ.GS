import { Edge } from "reactflow";
import { IMyEdge } from "../mindmap-context";

export class ReactFlowEdge implements IMyEdge {
  constructor(edge: Edge) {
    this.id = edge.id;
    this.source = edge.source;
    this.target = edge.target;
    this.originEdge = edge;
  }
  originEdge: any;
  id: string;
  source: string;
  target: string;
}
