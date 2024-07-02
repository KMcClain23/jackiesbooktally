// src/app/layout.tsx

import "./globals.css";
import NavBar from "@/app/components/Navbar";

export const metadata = {
  title: "Jackie's Book Tally",
  description: "Savor Every Sensual Story",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-tr overflow-x-hidden min-w-screen from-zinc-950 via-stone-900 to-neutral-950 flex min-h-screen flex-col items-center justify-between">
        <NavBar />
        <main className="p-4 pt-[64px] gap-6 w-full lg:w-[55%]">
          {children}
        </main>
      </body>
    </html>
  );
}
