"use client"
import { fetchPodcastByIdFromDB } from "@/actions/podcast.action";
import { fetchUserByIdFromDB } from "@/actions/user.action";
import { formatDate } from "@/lib/helper";
import { IKImage } from "imagekitio-next";
import {  CircleUserRound, UserIcon } from "lucide-react";
import { useEffect, useState } from "react";
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

// Define the type for a podcast
interface Podcast {
  authorId: string;
  title: string;
  imagePath: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface face {
  id       : string    
  email    : string    
  username  :string     
  clerkId   :string     
  name      :string
  is_Admin  :string    
  updatedAt :string  
}

export default function Page({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  // Initialize state with proper type
  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [user, setUser] = useState<face|[]>([]);

  async function getUser(authorId:string){
    const user = await fetchUserByIdFromDB(authorId)
    console.log(user)
    setUser(user)
  }
  useEffect(() => {
    async function getPodcasts() {
      try {
        const slug = (await params).slug;
        console.log("Slug:", slug);
        const response = await fetchPodcastByIdFromDB(slug);
        console.log("Raw response:", response)
        if (response) {
          // Assuming response is your podcast data
          setPodcast(response);
          getUser(response[0].authorId)
          // console.log(response[0].title);
        } else {
          console.error("Couldn't fetch");
        }
      } catch (error) {
        console.error("Error fetching podcast:", error);
      }
    }
    getPodcasts();
  }, [params]);

  // Show loading state while podcast is null
  if (!podcast) {
    return <div>Loading...</div>;
  }

  // Render content once podcast is available
  return (
    <div className='flex px-3'>
      <div className="flex-shrink-0 py-6 rounded-md w-58">
        <IKImage 
          urlEndpoint={urlEndpoint} 
          path={podcast[0].imagePath} 
          width={390} 
          height={250} 
          alt={podcast.title} 
        />
      </div>
      <div className="flex-1 items-center px-5">
        <div className="py-3 m-2">

        <h1 className="font-mono text-3xl">{podcast[0].title}</h1>
        <div className="flex py-2 items-center ">
        <CircleUserRound className=" mx-2"/>
        <h6 className="font-mono text-sm">{user[0]?.name}</h6>
        </div>
        <h6 className="font-mono text-xs">{formatDate(podcast[0].createdAt)}</h6>
        </div>

        <div className="prose max-w-none pb-4" 
        dangerouslySetInnerHTML={{__html:podcast[0].content}}
        />
      </div>
    </div>
  );
}