import type { ReactNode } from "react";

import "./globals.css";

export const metadata = {
  title: "福利凑单 Agent · Demo",
  description: "云梦泽好客 · 福利专区 AI 购物清单（纯前端演示）",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover" as const,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
