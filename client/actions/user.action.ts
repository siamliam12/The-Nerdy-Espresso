"use server"

import { db } from "@/lib/prisma"
import { auth, currentUser } from "@clerk/nextjs/server"


export async function SyncClerkUserToDataBase() {
    try {
        const {userId} = await auth()
        const user = await currentUser()
        if (!userId || !user) return
        //check if user exists
        const existingUser = await db.user.findUnique({
            where:{
                clerkId:userId
            }
        })
        if (existingUser){
            return existingUser
        }
        const saveNewUser = await db.user.create({
            data:{
                clerkId:userId,
                name:`${user.firstName || ""} ${user.lastName || ""}`,
                username: user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
                email:  user.emailAddresses[0].emailAddress,
            }
        })
        return saveNewUser
    } catch (error) {
        console.log("Error in saving User to database. Error: ",error)
    }
}

export async function getUserIdFromDB() {
    const {userId:clerkId} = await auth()
    if (!clerkId) throw new Error("Unauthorized")
    const user = await getUserByClerkId(clerkId)
    if (!user) throw new Error("User not found")
    return user.id
}

export async function getUserByClerkId(clerkId:string){
    return db.user.findUnique({
        where:{
            clerkId,
        },
        include:{
            _count:{
                select:{
                    podcasts:true,
                }
            }
        }
    })
}