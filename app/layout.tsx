import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pool Monitor",
  description: "Next.js application skeleton",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
