import ElkConstructor, {
  ELK,
  ELKConstructorArguments,
  ElkEdge,
  ElkExtendedEdge,
  ElkNode,
} from "elkjs/lib/elk.bundled.js";
import { v4 as uuidv4 } from "uuid";
import { MyEdge, MyNode } from "./types";

export class ElkMindMap {
  _graph: ElkNode;
  _nodes: Array<MyNode>;
  _edges: Array<MyEdge>;
  _elk: ELK;

  constructor(nodes: Array<MyNode>, edges: Array<MyEdge>) {
    this._elk = new ElkConstructor();
    this._graph = {
      id: "root",
      x: 0,
      y: 0,
      layoutOptions: {
        "elk.algorithm": "radial",
      },
      children: [],
      edges: [],
    };
    this._edges = edges;
    this._nodes = nodes;
  }

  public mapTo() {
    const root = this._nodes.find((s) => !s.parentNode);
    if (root) {
      const elkRootNode = this.toElkNode(root);
      this.recursionNode(root, elkRootNode);
      this._graph.children = [elkRootNode];
    }
  }

  public toElkNode(node: MyNode) {
    const elkRootNode: ElkNode = {
      id: node.id,
      width: node.width || 100,
      height: node.height || 50,
      layoutOptions: {
        "elk.algorithm": "layered",
        "elk.direction": "LEFT",
      },
    };
    return elkRootNode;
  }

  public toElkEdge(edge: MyEdge) {
    const result: ElkExtendedEdge = {
      id: edge.id,
      sources: [edge.source],
      targets: [edge.target],
    };
    return result;
  }

  public toNode(node: MyNode, elkNode: ElkNode) {
    const result: MyNode = {
      ...node,
      position: {
        x: elkNode.x ?? 0,
        y: elkNode.y ?? 0,
      },
    };
    return result;
  }

  public recursionNode(parentNode: MyNode, elkNode: ElkNode) {
    const childrenList = this._nodes.filter(
      (s) => s.parentNode === parentNode.id
    );
    if (childrenList.length > 0) {
      childrenList.forEach((val) => {
        elkNode.children = childrenList.map((s) => this.toElkNode(s));
        // newElkNode.edges = this._edges
        //   .filter((s) => s.source === val.id)
        //   .map((s) => this.toElkEdge(s));

        const newElkNode = this.toElkNode(val);
        this.recursionNode(val, newElkNode);
      });
    }
  }

  public recursionElkNode(parentNode: ElkNode, nodes: Array<MyNode>) {
    if (parentNode.children && parentNode.children.length > 0) {
      parentNode.children.forEach((val) => {
        const node = this._nodes.find((s) => s.id === val.id);
        if (node) {
          nodes.push(this.toNode(node, val));
        }
      });
    }
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

  public layout() {
    this.mapTo();
    console.log(this._graph);
    this._elk
      .layout(this._graph)
      .then(({ children, edges }) => {
        console.log(children);

        // children?.forEach((value) => {
        //   const node = this._nodes.find((f) => f.id === value.id);
        //   if (node) {
        //     node.position = {
        //       x: value.x ?? 0,
        //       y: value.y ?? 0,
        //     };
        //   }
        // });
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
