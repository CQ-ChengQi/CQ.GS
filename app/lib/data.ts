import { Edge, Node } from "reactflow";
import FlowTextUpdateNode from "../ui/components/flow-nodes/text-update-node";
import dagre from "@dagrejs/dagre";

const g = new dagre.graphlib.Graph({});

export const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

export const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

export const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

export const projects = [
  {
    name: "Flow",
    initials: "FG",
    href: "/dashboard/flow",
    members: 16,
    bgColor: "bg-pink-600",
  },
  {
    name: "Component Design",
    initials: "CD",
    href: "#",
    members: 12,
    bgColor: "bg-purple-600",
  },
  {
    name: "Templates",
    initials: "T",
    href: "#",
    members: 16,
    bgColor: "bg-yellow-500",
  },
  {
    name: "React Components",
    initials: "RC",
    href: "#",
    members: 8,
    bgColor: "bg-green-500",
  },
];

export const nodeTypes = { textUpdate: FlowTextUpdateNode };

export const initialNodes: Node<{ label: string }>[] = [];

export const initialEdges: Edge[] = [{ id: "1-2", source: "1", target: "2" }];

g.setGraph({ rankdir: "RL" });
g.setDefaultEdgeLabel(function () {
  return {};
});

g.setNode("Hello 1", { label: "Hello 1", width: 162, height: 47 });
g.setNode("World 2", { label: "Hello 2", width: 162, height: 47 });
g.setNode("World 3", { label: "Hello 3", width: 162, height: 47 });
g.setNode("World 4", { label: "Hello 4", width: 162, height: 47 });
g.setNode("World 5", { label: "Hello 5", width: 162, height: 47 });

dagre.layout(g);

g.nodes().forEach(function (v, i) {
  console.log("Node " + v + ": " + JSON.stringify(g.node(v)));
  initialNodes.push({
    id: `${i}`,
    data: {
      label: `${v}`,
    },
    position: {
      x: g.node(v).x,
      y: g.node(v).y,
    },
    type: "textUpdate",
  });
});