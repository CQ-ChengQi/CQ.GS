"use client";

import MdEditor from "../ui/compontens/md/editor";

export default function Page() {
  const handerUpdate = (html: string) => {
    console.log(html);
  };

  return <MdEditor onUpdate={handerUpdate} />;
}
