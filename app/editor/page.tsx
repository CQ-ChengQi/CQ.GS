"use client";

import { marked } from "marked";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type MyHtml = {
  __html: string | TrustedHTML;
};

const renderer = {
  heading(text: string, level: number, raw: string) {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");

    return `
            <h${level}>
              <a name="${escapedText}" class="anchor" href="#${escapedText}">
                <span class="header-link"></span>
              </a>
              ${text}
            </h${level}>`;
  },
};

marked.use({ renderer });

export default function Page() {
  const [html, setHtml] = useState<
    { __html: string | TrustedHTML } | undefined
  >();
  const [blocks, setBlocks] = useState<Array<MyHtml>>([{ __html: "<p></p>" }]);
  const [inputContent, setInputContent] = useState<string | null>();

  const handleInput = useCallback((event: React.FormEvent<HTMLPreElement>) => {
    // setHtml({ __html: marked.parse("# Heading").toString() });
    // setInputContent(event.currentTarget.textContent);
    console.log(event);
  }, []);

  const handleKeydown = useCallback(
    (event: React.KeyboardEvent<HTMLPreElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        console.log(inputContent);
        if (inputContent != null) {
          setBlocks((s) =>
            s.concat(...[{ __html: marked.parse(inputContent) }])
          );
          setInputContent(null);
        }
      }
    },
    [inputContent]
  );

  const handleFocus = useCallback(() => {}, []);

  useEffect(() => {
    const ls = blocks.map((s) => {
      return s.__html;
    });
    setHtml({ __html: ls.join("") });
  }, [blocks]);

  return (
    <>
      <pre
        contentEditable="true"
        className="h-full max-w-3xl p-4 prose"
        onInput={handleInput}
        onKeyDown={handleKeydown}
      >
        {blocks.map((s, index) => (
          <div key={index} dangerouslySetInnerHTML={s} onFocus={}></div>
        ))}
      </pre>
    </>
  );
}
