import { MyEdge, MyNode } from "./types";
import dagre from "@dagrejs/dagre";

export class DagreMindmap {
  private _nodes: Array<MyNode>;
  private _edges: Array<MyEdge>;
  private _g: dagre.graphlib.Graph;

  constructor() {
    this._nodes = [];
    this._edges = [];
    this._g = new dagre.graphlib.Graph();
    this._g.setGraph({});
    this._g.setDefaultNodeLabel(() => ({}));
  }
}
