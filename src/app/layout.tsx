import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import SessionWrapper from "@/components/SessionWrapper";
import { useSession } from "next-auth/react";
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
  // const { data: session, status } = useSession();
  // console.log("SESSION>>", session, status);
  return (
    <SessionWrapper>
      <html lang="en">
        <head>
          <link
            href="https://fonts.googleapis.com/earlyaccess/kopubbatang.css"
            rel="stylesheet"
          />
        </head>
        <body style={{ minHeight: "100vh" }}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </SessionWrapper>
  );
}
