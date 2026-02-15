import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import { ClerkProvider } from "@clerk/nextjs";
import Hydrated from "@/components/Hydrated";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BuildIndia",
  description: "Peer support network",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="app-container">
            <main className="main-content">
              <Hydrated>
                {children}
              </Hydrated>
            </main>
            <Hydrated>
              <BottomNav />
            </Hydrated>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
