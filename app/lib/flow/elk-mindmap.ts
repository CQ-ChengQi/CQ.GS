import ELK, { ElkNode } from "elkjs/lib/elk.bundled.js";
import { MyEdge, MyNode } from "./types";

export class ElkMindMap {
  _graph: ElkNode;
  _nodes: Array<MyNode>;
  _edges: Array<MyEdge>;
  // _elk: ELK;

  constructor() {
    // this._elk = new ELK();
    this._graph = {
      id: "root",
      x: 0,
      y: 0,
    };
    this._edges = [];
    this._nodes = [];
  }

  public setNodes(nodes: Array<MyNode>) {
    if (nodes.length > 0) {
      this._nodes = nodes.filter((s) => s.id !== "root");
      this._graph.children = this._nodes.map((node) => ({
        id: node.id,
        width: node.width || 100,
        height: node.height || 50,
      }));
    }
  }

  public setEdges(edges: Array<MyEdge>) {
    if (edges.length > 0) {
      this._edges = edges.filter((s) => s.source !== "root");
      this._graph.edges = this._edges.map((edge) => ({
        id: edge.id,
        sources: [edge.source],
        targets: [edge.target],
      }));
    }
  }

  public layout() {
    // elk
    //   .layout(graph)
    //   .then(({ children, edges }) => {
    //     // 更新节点位置
    //     const newNodes = children.map((child) => ({
    //       ...initialNodes.find((n) => n.id === child.id),
    //       position: { x: child.x, y: child.y },
    //     }));
    //     // 更新边的路径
    //     const newEdges = edges.map((edge) => ({
    //       ...initialEdges.find((e) => e.id === edge.id),
    //       sourcePosition: edge.sections[0].startPoint,
    //       targetPosition: edge.sections[0].endPoint,
    //       bendPoints: edge.sections[0].bendPoints,
    //     }));
    //     setNodes(newNodes);
    //     setEdges(newEdges);
    //   })
    //   .catch((error) => console.error("layout error:", error));
  }
}
