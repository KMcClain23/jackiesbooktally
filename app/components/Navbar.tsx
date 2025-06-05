// src/app/components/Navbar.tsx

"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation"; // Added useRouter
import Link from "next/link";
import { useAuth } from "../UserContext"; // Adjusted path
import { signOutUser } from "../firebase"; // Adjusted path

interface NavItem {
  path: string;
  name: string;
  requiresAuth?: boolean;
  isButton?: boolean;
  action?: () => void;
}

export default function NavBar() {
  const { user, loading } = useAuth();
  const router = useRouter();
  let pathname = usePathname() || "/";

  if (pathname.includes("/writing/")) {
    pathname = "/writing";
  }
  // Ensure pathname is updated when user signs out and lands on a different page
  useEffect(() => {
    if (pathname.includes("/writing/")) {
      pathname = "/writing";
    }
  }, [pathname]);


  const [hoveredPath, setHoveredPath] = useState(pathname);
  
  useEffect(() => {
    setHoveredPath(pathname);
  }, [pathname]);


  const handleSignOut = async () => {
    try {
      await signOutUser();
      // UserContext will handle state update, Navbar will re-render
      // Optionally, redirect if needed, though UserContext should manage this
      router.push('/'); 
    } catch (error) {
      console.error("Error signing out:", error);
      // Handle sign-out error (e.g., display a message)
    }
  };

  let navItems: NavItem[] = [];

  if (loading) {
    // Optionally, render a loading indicator or minimal nav
    // For now, we'll render no items, or you can have a specific loading item
    // navItems = [{ path: "#", name: "Loading..." }];
  } else if (user) {
    // Authenticated user
    navItems = [
      { path: "/", name: "Home" },
      { path: "/crestbid", name: "CrestBid Dashboard" }, // Added link
      { path: "/profile", name: "Profile" },
      { path: "/settings", name: "Settings" },
      { path: "/blog", name: "Blog" },
      // Keep existing non-auth specific items if desired
      { path: "/now", name: "Now" },
      { path: "/guestbook", name: "Guestbook" },
      { path: "/writing", name: "Writing" },
      { path: "#signout", name: "Sign Out", isButton: true, action: handleSignOut },
    ];
  } else {
    // Not authenticated user
    navItems = [
      { path: "/", name: "Home" },
      { path: "/signup", name: "Sign Up" },
      { path: "/signin", name: "Sign In" },
      // Keep existing non-auth specific items if desired
      { path: "/now", name: "Now" },
      { path: "/guestbook", name: "Guestbook" },
      { path: "/writing", name: "Writing" },
    ];
  }
  
  if (loading) {
    return (
      <div className="border border-stone-800/90 p-[0.4rem] rounded-lg mb-6 sticky top-4 z-[100] bg-stone-900/80 backdrop-blur-md">
        <nav className="flex gap-2 relative justify-start w-full z-[100] rounded-lg">
          <div className="px-4 py-2 text-zinc-400">Loading...</div>
        </nav>
      </div>
    );
  }

  return (
    <div className="border border-stone-800/90 p-[0.4rem] rounded-lg mb-6 sticky top-4 z-[100] bg-stone-900/80 backdrop-blur-md">
      <nav className="flex gap-2 relative justify-start w-full z-[100] rounded-lg">
        {navItems.map((item) => {
          const isActive = item.path === pathname;

          if (item.isButton) {
            return (
              <button
                key={item.name}
                onClick={item.action}
                className={`px-4 py-2 rounded-md text-sm lg:text-base relative no-underline duration-300 ease-in ${
                  isActive ? "text-zinc-100" : "text-zinc-400"
                } hover:text-black cursor-pointer`}
                onMouseOver={() => setHoveredPath(item.path)}
                onMouseLeave={() => setHoveredPath(pathname)}
              >
                <span>{item.name}</span>
                {item.path === hoveredPath && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-full bg-pink-200/80 rounded-md -z-10"
                    layoutId="navbar" // Ensure this is unique or handled if multiple buttons can be active
                    aria-hidden="true"
                    style={{ width: "100%" }}
                    transition={{
                      type: "spring",
                      bounce: 0.25,
                      stiffness: 130,
                      damping: 9,
                      duration: 0.3,
                    }}
                  />
                )}
              </button>
            );
          }

          return (
            <Link
              key={item.path}
              className={`px-4 py-2 rounded-md text-sm lg:text-base relative no-underline duration-300 ease-in ${
                isActive ? "text-zinc-100" : "text-zinc-400"
              } hover:text-black`}
              href={item.path}
              onMouseOver={() => setHoveredPath(item.path)}
              onMouseLeave={() => setHoveredPath(pathname)}
            >
              <span>{item.name}</span>
              {item.path === hoveredPath && (
                <motion.div
                  className="absolute bottom-0 left-0 h-full bg-pink-200/80 rounded-md -z-10"
                  layoutId="navbar"
                  aria-hidden="true"
                  style={{ width: "100%" }}
                  transition={{
                    type: "spring",
                    bounce: 0.25,
                    stiffness: 130,
                    damping: 9,
                    duration: 0.3,
                  }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
