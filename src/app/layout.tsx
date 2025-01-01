import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import SessionWrapper from "@/components/SessionWrapper";
const inter = Inter({ subsets: ["latin"], style: "normal" });

export const metadata: Metadata = {
  title: "KHCARD",
  description: "KHCARD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={inter.className} style={{ minHeight: "100vh" }}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </SessionWrapper>
  );
}
