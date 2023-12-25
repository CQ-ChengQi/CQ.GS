import ElkConstructor, {
  ELK,
  ELKConstructorArguments,
  ElkNode,
} from "elkjs/lib/elk.bundled.js";
import { v4 as uuidv4 } from "uuid";
import { MyEdge, MyNode } from "./types";

export class ElkMindMap {
  _graph: ElkNode;
  _nodes: Array<MyNode>;
  _edges: Array<MyEdge>;
  _elk: ELK;

  constructor() {
    this._elk = new ElkConstructor();
    this._graph = {
      id: "root",
      x: 0,
      y: 0,
      layoutOptions: {
        "elk.algorithm": "layered",
      },
    };
    this._edges = [];
    this._nodes = [
      {
        id: "root",
        type: "markdownNode",
        position: { x: 0, y: 0 },
        data: {
          content: "<h1>主题</h1>",
        },
        selected: true,
      },
    ];
  }

  public addNode(node: MyNode) {
    if (this._nodes.findIndex((s) => s.id === node.id) === -1) {
      this._nodes.push(node);
    }
  }

  public addEdge(edge: MyEdge) {
    if (this._edges.findIndex((s) => s.id === edge.id) === -1) {
      this._edges.push(edge);
    }
  }

  public setNodes(nodes: Array<MyNode>) {
    this._nodes = nodes;
  }

  public setEdges(edges: Array<MyEdge>) {
    this._edges = edges;
  }

  private mapNodes() {
    if (this._nodes.length > 0) {
      this._graph.children = this._nodes.map((node) => ({
        id: node.id,
        width: node.width || 100,
        height: node.height || 50,
      }));
      console.log(this);
    }
  }

  private mapEdges() {
    if (this._edges.length > 0) {
      this._graph.edges = this._edges.map((edge) => ({
        id: edge.id,
        sources: [edge.source],
        targets: [edge.target],
      }));
    }
  }

  public layout() {
    this.mapEdges();
    this.mapNodes();
    this._elk
      .layout(this._graph)
      .then(({ children, edges }) => {
        children?.forEach((value) => {
          const node = this._nodes.find((f) => f.id === value.id);
          if (node) {
            node.position = {
              x: value.x ?? 0,
              y: value.y ?? 0,
            };
          }
        });

        // edges?.forEach((value) => {
        //   const edge = this._edges.find((f) => f.id === value.id);
        //   if (edge) {

        //   }
        // });
      })
      .catch((error) => console.error("layout error:", error));
  }

  public getNodes() {
    return this._nodes;
  }
}
