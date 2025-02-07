// import { Buffer } from 'buffer'; 
import ImageKit from "imagekit";

const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
    privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});

// export const handleImageUpload = async (formData: FormData) => {
export const handleImageUpload = async (image: File) => {
    // const image = formData.get("image") as File;
    
    if (!image) {
        console.error("No image is found");
        return null;
    }

    try {
        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const response = await imagekit.upload({
            file: buffer,
            fileName: image.name,
        });
        return response
    } catch (error) {
        console.error("Error uploading image:", error);
        return null;
    }
};
