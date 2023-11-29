import type { Metadata } from "next";
import "./globals.css";

// 导入 Googole 字体。
import { inter } from "./ui/fonts";

// 设置 html meta 数据。
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className={`${inter.className} antialiased h-full`}>
        {children}
      </body>
    </html>
  );
}