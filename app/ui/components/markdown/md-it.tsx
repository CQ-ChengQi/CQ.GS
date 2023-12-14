import { MdContext, MdContextType } from "@/app/lib/stores/md-context";
import React, { useContext } from "react";

export default function MdIt({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const { toHtml } = useContext(MdContext);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: toHtml(text) }}
    ></div>
  );
}
