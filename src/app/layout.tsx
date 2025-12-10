import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";


const googleSansFlex = localFont({
  src: "./fonts/GoogleSansFlex.ttf",
  variable: "--font-google-sans-flex",
  display: "swap",
})

export const metadata: Metadata = {
  title: "StackFrame",
  description: "AI AutoStack Architect",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${googleSansFlex.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
