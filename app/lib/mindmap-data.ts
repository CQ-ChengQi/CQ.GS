import FlowTextUpdateNode from "../ui/components/flow-nodes/text-update-node";
import { NodeData } from "./models/node-data";
import { Node, Edge } from "reactflow";
import { v4 as uuidv4 } from "uuid";
import dagre from "@dagrejs/dagre";

let initialNodes: Node<NodeData>[] = [];
let initialEdges: Edge[] = [];
const nodeTypes = { textUpdate: FlowTextUpdateNode };

const g = new dagre.graphlib.Graph({});

g.setGraph({ rankdir: "RL", align: "UL", nodesep: 100 });
g.setDefaultEdgeLabel(function () {
  return {};
});

// 获取节点类型。
export function getNodeTypeList() {
  return nodeTypes;
}

// 添加节点。
export function addNode() {
  const id = uuidv4();
  g.setNode(id, {
    label: "Hello",
    width: 162,
    height: 47,
    selected: false,
    id: id,
  });
  dagre.layout(g);
  console.log(g);
}

// 获取节点。
export function getNodes() {
  initialNodes = [];

  g.nodes().forEach(function (v, i) {
    console.log("Node " + v + ": " + JSON.stringify(g.node(v)));
    initialNodes.push({
      id: g.node(v)["id"],
      data: {
        label: `${v}`,
      },
      position: {
        x: g.node(v).x,
        y: g.node(v).y,
      },
      type: "textUpdate",
      selected: g.node(v)["selected"],
    });
  });

  return initialNodes;
}

// 选择。
export function selecteNode(id: string) {
  const i = initialNodes.findIndex((s) => s.id === id);
  for (let index = 0; index < initialNodes.length; index++) {
    if (index === i) {
      initialNodes[i].selected = true;
    } else {
      initialNodes[i].selected = false;
    }
  }
}

// 获取线。
export function getEdges() {
  return initialEdges;
}

// 删除节点
export function removeNode(id: string) {
  g.removeNode(id);
  initialNodes = initialNodes.filter((s) => s.id !== id);
  dagre.layout(g);
}
