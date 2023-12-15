import { MdContext } from "@/app/lib/stores/md-context";
import React, { useCallback } from "react";
import { RendererObject, marked } from "marked";

const renderer: RendererObject = {
  heading(text: string, level: number, raw: string) {
    return `<h${level} class="text-red-500">${text}</h${level}>`;
  },
};

marked.use({ renderer });

export default function MdProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const toHtml = useCallback((text: string) => {
    const html = marked.parse(text);
    if (typeof html === "string") {
      return html;
    }
    return "";
  }, []);

  return <MdContext.Provider value={{ toHtml }}>{children}</MdContext.Provider>;
}
