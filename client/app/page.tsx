"use client";
import ShowPodcast from "@/components/ShowPodcast";
import React, { useState, useEffect } from "react";
import { fetchPodcastsFromDB } from "@/actions/podcast.action";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [podcasts, setPodcasts] = useState<{ authorId: string; title: string }[]>([]);

  useEffect(() => {
    async function getPodcasts() {
      const response = await fetchPodcastsFromDB();
      console.log("response",response)
      if (response.success) {
        const formattedPodcasts = response.podcasts.map(podcast => ({
          ...podcast,
          createdAt: podcast.createdAt.toISOString(),
          updatedAt: podcast.updatedAt.toISOString()
        }));
        setPodcasts(formattedPodcasts);
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

