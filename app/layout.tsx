import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Monty Hall Problem Simulator",
  description: "A game to simulate the Monty Hall problem",
  openGraph: {
    title: 'A Monty Hall Problem Simulator',
    description: "A game to simulate the Monty Hall problem",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={"antialiased"}
      >
        {children}
      </body>
    </html>
  );
}
