import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
import { IKImage } from "imagekitio-next";
import Link from "next/link";
import { Button } from "./ui/button";
import { formatDate } from "@/lib/helper";

interface ShowPodcastProps{
    podcast: {
        id: string;
        title: string;
        content: string;
        imagePath: string;
        createdAt: string;
        updatedAt: string;
        authorId: string;
      }
}

function ShowPodcast({podcast}:ShowPodcastProps) {
  return (
    <div className="px-3 py-4">
      <Card className="p-2">
        <CardHeader>
            <IKImage urlEndpoint={urlEndpoint} path={podcast.imagePath} width={250} height={150} alt="Alt text" />
          <CardTitle className="py-2">{podcast.title}</CardTitle>
          <Button onClick={()=>console.log("clicked")}>
        <Link href={`/podcasts/${podcast.id}`}>
            Read More
        </Link>
          </Button>
          <CardDescription>Date: {formatDate(podcast.createdAt)}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

export default ShowPodcast;


