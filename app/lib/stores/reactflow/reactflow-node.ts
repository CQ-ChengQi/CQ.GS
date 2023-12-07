import { Node, Position } from "reactflow";
import { IMyNode, IMyPostion } from "../mindmap-context";

export interface NodeData {
  label: string;
}

export class ReactFlowNode implements IMyNode {
  constructor(node: Node<NodeData>) {
    this.id = node.id;
    this.originNode = node;
  }
  setSourcePosition(sourcePos: "top" | "bottom" | "left" | "right"): void {
    let pos: Position;
    switch (sourcePos) {
      case "top":
        pos = Position.Top;
        break;
      case "bottom":
        pos = Position.Bottom;
        break;
      case "left":
        pos = Position.Left;
        break;
      case "right":
        pos = Position.Right;
        break;
    }
    this.originNode.sourcePosition = pos;
  }
  setPosition(pos: IMyPostion) {
    this.originNode.position = {
      x: pos.x,
      y: pos.y,
    };
  }

  setTargetPosition(targetPos: "top" | "bottom" | "left" | "right") {
    let pos: Position;
    switch (targetPos) {
      case "top":
        pos = Position.Top;
        break;
      case "bottom":
        pos = Position.Bottom;
        break;
      case "left":
        pos = Position.Left;
        break;
      case "right":
        pos = Position.Right;
        break;
    }
    this.originNode.targetPosition = pos;
  }

  originNode: Node<NodeData>;

  id: string;
}
