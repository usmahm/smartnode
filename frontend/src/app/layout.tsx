import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import App from "./app";
import ReactGA from "react-ga4";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SmartNode",
  description: "A personal home automation prototype",
};

// ReactGA.initialize(process.env.NEXT_PUBLIC_G_ID);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet"></link> */}
      <body>
        <App>{children}</App>
      </body>
    </html>
  );
}
