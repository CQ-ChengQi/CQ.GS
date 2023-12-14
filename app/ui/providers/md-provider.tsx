import { MdContext } from "@/app/lib/stores/md-context";
import React, { useCallback } from "react";
import markdownit from "markdown-it";

const md = markdownit();

export default function MdProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const toHtml = useCallback((text: string) => {
    return md.render(text);
  }, []);

  return <MdContext.Provider value={{ toHtml }}>{children}</MdContext.Provider>;
}
