"use client";
import React from "react";
import { IKImage } from "imagekitio-next";
import { FileUpload } from "@/components/FileUpload";
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

export default function Home() {
  const render = ()=>{
      const key =  process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY || "test"
      console.log(key)
  }
  return <div className="App">
    <IKImage urlEndpoint={urlEndpoint} path="/snorkelling-101-first-timers-guide.thumb.800.480_SmT5lNgzL.jfif" width={400} height={400} alt="Alt text" />
  <FileUpload/>
  </div>;
}