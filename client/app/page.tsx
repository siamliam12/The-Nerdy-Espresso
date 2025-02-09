"use client";
import ShowPodcast from "@/components/ShowPodcast";
import React, { useState, useEffect } from "react";
import { fetchPodcastsFromDB } from "@/actions/podcast.action";
import { Separator } from "@/components/ui/separator";

interface podcastStuff{
  id: string
  title: string
  content: string
  imagePath: string
  createdAt: string
  updatedAt: string
  authorId: string
}

export default function Home() {
  const [podcasts, setPodcasts] = useState<podcastStuff[]>([]);

  useEffect(() => {
    async function getPodcasts() {
      const response = await fetchPodcastsFromDB();
      console.log("response",response)
      if (response.success) {
        const formattedPodcasts = response.podcasts?.map(podcast => ({
          id: podcast.id,
          title: podcast.title,
          content: podcast.content,
          imagePath: podcast.imagePath || "",
          createdAt: podcast.createdAt.toISOString(),
          updatedAt: podcast.updatedAt.toISOString(),
          authorId: podcast.authorId
        }));
        setPodcasts(formattedPodcasts || []);
      } else {
        console.error(response.error);
      }
    }
    getPodcasts();
  }, []);

  return (
    <div className="ml-3 pt-4">
      <h1 className="text-3xl font-bold pb-2">Read Podcasts</h1>
      <Separator/>
    <div className="container mx-auto justify-center items-center py-2 flex flex-wrap">
      {podcasts.map((podcast) => (
        <ShowPodcast key={podcast.authorId} podcast={podcast} />
      ))}
    </div>
      </div>
  );
}

