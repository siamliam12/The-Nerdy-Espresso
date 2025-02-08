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

async function Navbar() {
  const user = await currentUser();
  if (user) await SyncClerkUserToDataBase();
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="flex items-center">
      <span className="text-xl font-bold">The Nerdy Espresso</span>
      </div>
      <div className="flex space-x-4">
      <Link href="/" className="hover:text-gray-400">Home</Link>
      <Link href="/podcasts" className="hover:text-gray-400">Podcasts</Link>
      <Link href="/contact" className="hover:text-gray-400">Contact</Link>
      </div>
      <div className="flex space-x-2">
        <DarkModeToggleButton/>
      <SignedOut>
        <Button variant="secondary">

        <SignInButton mode="modal" />
        </Button>
        <SignUpButton mode="modal" />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      </div>
    </div>
  );
}

export default Navbar;
