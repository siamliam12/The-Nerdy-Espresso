import { SyncClerkUserToDataBase } from "@/actions/user.action";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import DarkModeToggleButton from "./DarkModeToggleButton";
import { Coffee } from "lucide-react";

async function Navbar() {
  const user = await currentUser();
  if (user) await SyncClerkUserToDataBase();
  return (
      <nav className="sticky top-0 z-50 w-full bg-gray-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center h-16 px-4">
            <div className="flex items-center">
            <Coffee color="#EAB319" />
              <span className="text-xl font-mono font-thin">The Nerdy<span className="text-yellow-500">
                <sub>Espresso</sub> 
                 </span></span>
            </div>
            
            <div className="flex space-x-6">
              <Link href="/" className="hover:text-gray-400 transition-colors">
                Home
              </Link>
              <Link href="/podcasts" className="hover:text-gray-400 transition-colors">
                Podcasts
              </Link>
              <Link href="/contact" className="hover:text-gray-400 transition-colors">
                Contact
              </Link>
            </div>
  
            <div className="flex items-center space-x-4">
              <DarkModeToggleButton />
              <SignedOut>
                <Button variant="secondary">
                  <SignInButton mode="modal" />
                </Button>
                <Button variant="secondary">
                  <SignUpButton mode="modal" />
                </Button>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>
    );
}

export default Navbar;
