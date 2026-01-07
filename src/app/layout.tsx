import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fanarts Studio",
  description: "Crafting Visual Stories That Transcend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
