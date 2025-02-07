import { SyncClerkUserToDataBase } from '@/actions/user.action';
import { currentUser } from '@clerk/nextjs/server';
import React from 'react'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";


async function Navbar() {
    const user = await currentUser();
    if (user) await SyncClerkUserToDataBase()
  return (
    <div>
            <SignedOut >
              <SignInButton mode="modal"/>
              <SignUpButton mode="modal"/>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
    </div>
  )
}

export default Navbar