"use client";
// import { handleImageUpload } from "@/actions/image.action";
import { createPodcast } from "@/actions/podcast.action";
import PodcastEditor from "@/components/PodcastEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import React,{ useRef, useState } from "react";

function Dashboard() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [head, setHead] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState<File | null>(null);
  // const [imagePathRes, setImagePath] = useState("")
  const [isSaving, setIsSaving] = useState(false);


  async function handleSubmit(formData: FormData ) {
  // async function handleSubmit(e: React.FormEvent<HTMLFormElement> ) {
    // e.preventDefault();
    setIsSaving(true);
    // const formData = new FormData(formRef.current!);
    try {
      if (!image) return
      // const imagePathRes = "await handleImageUpload(formData)";
      // console.log(res);
      formData.set("title", head);
      formData.set("content", body);
      formData.set("image", image || "");
      for (const [key, value] of formData.entries()) {
        console.log(`key : ${key}, value: ${value}`);
    }
      // console.log(formData);
      const result = await createPodcast(formData);
      if (result?.success) {
        console.log(result);
        router.push(`/podcasts/${result.podcast?.id}`);
      } else {
        throw new Error(result?.error);
      }
    } catch (error) {
      console.log("Error:", error);
      // alert('Failed to save post')
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form ref={formRef} action={handleSubmit}>
        <div className="mb-6">
          <Input
            name="title"
            type="text"
            placeholder="Post title"
            value={head}
            onChange={(e) => setHead(e.target.value)}
            className="text-2xl font-bold"
          />
        </div>
        <div className="border border-gray-300 shadow-md p-4 rounded-md">

        <PodcastEditor
          initialContent={body}
          onContentChange={(newContent) => setBody(newContent)}
        />
        </div>
        <Label htmlFor="Image">Upload the thumbnail</Label>
        <Input
          id="image"
          name="image"
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setImage(file);
            console.log("Selected file: ", file);
          }}
        />

        <div className="mt-4">
          <Button
            type="submit"
            disabled={isSaving}
            className="w-full"
          >
            {isSaving ? "Publishing..." : "Publish Post"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Dashboard;
