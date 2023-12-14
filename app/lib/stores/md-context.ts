import React from "react";

export interface MdContextType {
  toHtml: (text: string) => string;
}

const defaultState: MdContextType = {
  toHtml: (text: string) => "",
};

export const MdContext = React.createContext(defaultState);
