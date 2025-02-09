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
}

interface face {
  id: string;
  email: string;
  username: string;
  clerkId: string;
  name: string;
  is_Admin: string;
  updatedAt: string;
}

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Initialize state with proper type
  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [user, setUser] = useState<face | []>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [userId, setuserId] = useState("");

  async function getUser(authorId: string) {
    const user = await fetchUserByIdFromDB(authorId);
    setUser(user);
  }

  async function handleLikeClick() {
    if (!podcast) return;
    const result = await togleLikePodcast(podcast[0].id,userId)
    if (result.success){
      setIsLiked(result.liked)
      setLikeCount(prev=> result.liked ? prev + 1 : prev - 1 )
    }
  }


  useEffect(() => {
    async function getPodcasts() {
      try {
        const userinfo = await getCurrentUser()
        setuserId(userinfo)
        const slug = (await params).slug;
        const response = await fetchPodcastByIdFromDB(slug);
        if (response) {
          // Assuming response is your podcast data
          setPodcast(response);
          getUser(response[0].authorId);
          setLikeCount(response[0]._count.likes)

          //check if user has liked this podcast
          if (userId){
            const hasLiked = await checkIfUserLikedPodcast(response[0].id,userId)
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
  }, [params]);

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
            path={podcast[0].imagePath}
            width={390}
            height={250}
            alt={podcast.title}
          />
        </div>
      </div>
      <div className="flex-1 items-center px-5">
        <div className="py-3 m-2">
          <h1 className="font-mono text-3xl">{podcast[0].title}</h1>
          <div className="flex py-2 items-center ">
            <CircleUserRound className=" mr-2" />
            <h6 className="font-mono text-sm">{user[0]?.name}</h6>
          </div>
          <h6 className="font-mono text-xs">
            {formatDate(podcast[0].createdAt)}
          </h6>
        </div>

        <div
          className="prose max-w-none pb-4"
          dangerouslySetInnerHTML={{ __html: podcast[0].content }}
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
