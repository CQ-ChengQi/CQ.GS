import FlowTextUpdateNode from "../ui/components/flow-nodes/text-update-node";
import { NodeData } from "./models/node-data";
import { Node, Edge } from "reactflow";
import { v4 as uuidv4 } from "uuid";
import dagre, { Label } from "@dagrejs/dagre";

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
  const label: Label = {
    label: "Hello",
    width: 162,
    height: 47,
    selected: false,
    id: id,
  };
  addDagreNode(label);
}

function addDagreNode(label: Label) {
  const id: string = getLabelId(label);

  if (g.hasNode(id)) g.removeNode(id);
  g.setNode(id, label);
}

// 获取节点。
export function getNodes() {
  initialNodes = [];
  dagre.layout(g);
  g.nodes().forEach(function (v, i) {
    const node = g.node(v);
    const id = getLabelId(node);
    const selected = getLabelSelected(node);

    initialNodes.push({
      id: id,
      data: {
        label: `${v}`,
      },
      position: {
        x: g.node(v).x,
        y: g.node(v).y,
      },
      type: "textUpdate",
      selected: selected,
    });
  });

  console.log(initialNodes);

  return initialNodes;
}

function getLabelId(label: Label, value: string = "") {
  let id: string = "";
  if (label && "id" in label) {
    const pk = label["id"];

    if (value.length > 0) {
      label["id"] = value;
      id = value;
    } else {
      if (typeof pk === "string") {
        id = pk;
      }
    }
  }

  return id;
}

function getLabelSelected(label: Label, value: boolean | undefined = false) {
  let selected: boolean = false;
  if (label && "selected" in label) {
    const select = label["selected"];
    if (value !== undefined) {
      label["selected"] = value;
      console.log("设置值", label);
      selected = value;
    } else {
      if (typeof select === "boolean") {
        selected = select;
      }
    }
  }
  return selected;
}

// 选择。
export function selecteNode(id: string) {
  const i = initialNodes.findIndex((s) => s.id === id);
  console.log(id);
  console.log(i);

  for (let index = 0; index < initialNodes.length; index++) {
    let node = g.node(initialNodes[index].id);
    if (index === i) {
      getLabelSelected(node, true);
    } else {
      getLabelSelected(node, false);
    }

    console.log(node);
    addDagreNode(node);
  }

  getNodes();
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
