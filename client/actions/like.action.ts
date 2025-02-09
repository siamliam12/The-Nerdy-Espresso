"use server"

import { db } from "@/lib/prisma";
// import { getUserIdFromDB } from "./user.action"
// import { auth } from "@clerk/nextjs/server";

export async function togleLikePodcast(podcastId:string,userId: string){
    try {
        // const {userId} = auth()
        if (!userId){
            console.log("User not authenticated")
            return
        }
        const existingLike = await db.like.findUnique({
            where:{
                userId_podcastId:{
                    userId,
                    podcastId
                }
            }
        })
        if (existingLike){
            await db.like.delete({
                where:{
                    userId_podcastId:{
                        userId,
                        podcastId
                    }
                }
            })
            return { success: true, liked: false };
        }else{
            await db.like.create({
                data:{
                    userId,
                    podcastId
                }
            })
            return { success: true, liked: true };
        }
    } catch (error) {
        console.error("Error toggling like:", error);
        return;
    }
}

export async function checkIfUserLikedPodcast(podcastId:string,userId: string){
    try {
        // const {userId} = auth()
        if (!userId){
            return false
        }
        const like = await db.like.findUnique({
            where:{
                userId_podcastId:{
                    userId,
                    podcastId
                }
            }
        })
        return !!like
    } catch (error) {
        console.error("Error checking like status:", error);
        return false;
    }
}

