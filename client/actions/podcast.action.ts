'use server'

import { db } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { getUserIdFromDB } from "./user.action"
import { handleImageUpload } from "./image.action";

export async function createPodcast(formData: FormData){
    const image = formData.get("image") as File;
    const content = formData.get("content") as string;
    const title = formData.get("title") as string;
    try {
        const [userId, imagePathObject] = await Promise.all([
            getUserIdFromDB(),
            handleImageUpload(image)
        ]);
        if (!userId) return
        if (imagePathObject !== null || imagePathObject !== undefined){

            const imagePath = imagePathObject?.filePath; // Remove the single quotes
            console.log("looking at the response", typeof(imagePath))
            const podcast = await db.podcasts.create({
                data:{
                    title,
                    content,
                    imagePath,
                    authorId: userId,
                }
            }) 
            console.log(podcast)
            revalidatePath("/")
            return { success: true, podcast }
        }else{
            console.log("Error in response ")
        }
    } catch (error) {
        console.error("Failed to create podcast:", error);
        return { success: false, error: "Failed to create podcast" };
    }
}
