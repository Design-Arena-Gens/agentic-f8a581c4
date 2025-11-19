import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aurora AI Studio",
  description:
    "Ciptakan ide, strategi, dan konten cerdas secara instan dengan Aurora AI."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
