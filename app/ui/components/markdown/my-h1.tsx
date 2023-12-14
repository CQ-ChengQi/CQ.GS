import MdIt from "./md-it";

export default function MyH1({ text }: { text: string }) {
  return <MdIt text={text} className="text-red-500"></MdIt>;
}
