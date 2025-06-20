// src/app/layout.tsx

import "./globals.css";
import NavBar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer"; // Assuming you have a Footer component
import { UserProvider } from "./UserContext"; // Import UserProvider

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
      <body className="bg-gradient-to-tr overflow-x-hidden min-w-screen from-zinc-950 via-stone-900 to-neutral-950 flex flex-col min-h-screen">
        <UserProvider>
          <div className="flex flex-col flex-1 items-center justify-between">
            <NavBar />
            <main className="w-full lg:w-[55%]">
              {children}
            </main>
          </div>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
