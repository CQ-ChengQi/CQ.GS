import { MdContext, MdContextType } from "@/app/lib/stores/md-context";
import React, {
  createRef,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

export default function MdIt({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const { toHtml } = useContext(MdContext);
  const [content, setContent] = useState("");
  const [html, setHtml] = useState("");
  const mdRef = createRef<HTMLDivElement>();

  const handleContentChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      setContent(event?.currentTarget.value);
      setHtml(toHtml(event?.currentTarget.value));
    },
    [toHtml]
  );

  return (
    <>
      <div className="">
        <div
          ref={mdRef}
          className={className}
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
        <input type="text" className="" onInput={handleContentChange} />
      </div>
    </>
  );
}
