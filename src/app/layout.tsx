import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import { ClerkProvider } from "@clerk/nextjs";
import Hydrated from "@/components/Hydrated";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tight Knit",
  description: "Help your friends when they are low",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
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
