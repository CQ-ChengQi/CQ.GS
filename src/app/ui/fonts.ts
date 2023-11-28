import { Inter, Lusitana, Noto_Sans, Ma_Shan_Zheng } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });

export const lusitana = Lusitana({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-lusitana",
});

export const notoSans = Noto_Sans({
  weight: ["500", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans",
});

export const maShanZheng = Ma_Shan_Zheng({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-ma-shan-zheng",
});
