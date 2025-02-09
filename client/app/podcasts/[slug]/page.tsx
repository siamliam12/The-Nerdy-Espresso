"use client";
import { checkIfUserLikedPodcast, togleLikePodcast } from "@/actions/like.action";
import { fetchPodcastByIdFromDB } from "@/actions/podcast.action";
import { fetchUserByIdFromDB, getCurrentUser } from "@/actions/user.action";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/helper";
import { IKImage } from "imagekitio-next";
import { CircleUserRound, Heart} from "lucide-react";
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
  _count:{
    likes:number;
  }
}

interface face {
  id: string;
  email: string;
  username: string;
  clerkId: string;
  name: string;
  is_Admin: boolean;
  updatedAt: string;
}

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Initialize state with proper type
  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [user, setUser] = useState<face | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [userId, setuserId] = useState("");

  async function getUser(authorId: string) {
    const user = await fetchUserByIdFromDB(authorId);
    console.log("testing : ",user?.id)
    if (user !== null || user !== undefined){
      const formattedUser: face = {
        id:user?.id || "",
        email: user?.email || "",
        username: user?.username || "",
        clerkId: user?.clerkId || "",
        is_Admin: user?.is_Admin || false,
        name:user?.name || "",
        updatedAt: user?.updatedAt.toISOString() || ""
      };
      setUser(formattedUser);
    }
  }

  async function handleLikeClick() {
    if (!podcast) return;
    const result = await togleLikePodcast(podcast.id,userId)
    if (result?.success){
      setIsLiked(result.liked)
      setLikeCount(prev=> result.liked ? prev + 1 : prev - 1 )
    }
  }


  useEffect(() => {
    async function getPodcasts() {
      try {
        const userinfo = await getCurrentUser() || ""
        setuserId(userinfo)
        const slug = (await params).slug;
        const response = await fetchPodcastByIdFromDB(slug);
        if (Array.isArray(response) && response.length > 0 && response[0] !== null) {
          const formattedPodcast: Podcast = {
            ...response[0],
            imagePath: response[0].imagePath || "",
            createdAt: response[0].createdAt.toISOString(), // Ensure it's a string
            updatedAt: response[0].updatedAt.toISOString(), // Ensure it's a string
          };
          // Assuming response is your podcast data
          setPodcast(formattedPodcast);
          getUser(formattedPodcast.authorId);
          setLikeCount(formattedPodcast._count.likes)

          //check if user has liked this podcast
          if (userId){
            const hasLiked = await checkIfUserLikedPodcast(formattedPodcast.id,userId)
            setIsLiked(hasLiked)
          }

        } else {
          console.error("Couldn't fetch");
        }
      } catch (error) {
        console.error("Error fetching podcast:", error);
      }
    }
    getPodcasts();
  }, [params,userId]);

  // Show loading state while podcast is null
  if (!podcast) {
    return <div>Loading...</div>;
  }
  // Render content once podcast is available
  return (
    <div className="flex px-3 min-h-screen">
      <div className="flex-none w-[390px] py-6">
        <div className="sticky top-20 z-10">
          <IKImage
            urlEndpoint={urlEndpoint}
            path={podcast.imagePath}
            width={390}
            height={250}
            alt={podcast.title}
          />
        </div>
      </div>
      <div className="flex-1 items-center px-5">
        <div className="py-3 m-2">
          <h1 className="font-mono text-3xl">{podcast.title}</h1>
          <div className="flex py-2 items-center ">
            <CircleUserRound className=" mr-2" />
            <h6 className="font-mono text-sm">{user?.name}</h6>
          </div>
          <h6 className="font-mono text-xs">
            {formatDate(podcast.createdAt)}
          </h6>
        </div>

        <div
          className="prose max-w-none pb-4"
          dangerouslySetInnerHTML={{ __html: podcast.content }}
        />
        <Separator/>
        <div className="flex items-center m-4">
          <Button
          onClick={handleLikeClick}
          className="flex items-center hover:opacity-70 transition-opacity"
          >

          <Heart size={16} className={`mr-1 ${isLiked ? 'fill-current text-red-500' : ''}`}/>
          <h6 className="font-mono text-xs">{likeCount}</h6>
          </Button>
        </div>
      </div>
    </div>
  );
}