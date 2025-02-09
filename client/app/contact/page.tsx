import { Github, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Contact() {
  return (
    <div className="flex px-3 min-h-screen">
      <div className="flex-none w-[390px] py-6">
        <div className="sticky top-20 z-10">
          <Image src="/me-avatar.png" width={390} height={250} alt="Myself" />
        </div>
      </div>
      <div className="flex-1 items-center px-5">
        <div className="py-3 m-2">
          <h1 className="font-mono text-3xl">
            Hi, I am Siam Ahmed. I am the host of <br />{" "}
            <span className="text-yellow-500">The Nerdy Espresso.</span>
          </h1>
          <div className="flex py-2 items-center ">
            <Youtube size={20} className="mr-2 " />
            <h6 className="font-mono text-sm">
              <span className="text-yellow-500">Youtube: </span>
              <Link href="https://www.youtube.com/@lunstra_studios">
                https://www.youtube.com/@lunstra_studios
              </Link>
            </h6>
          </div>
          <div className="flex py-2 items-center ">
            <Github size={20} className="mr-2 " />
            <h6 className="font-mono text-xs">
              <span className="text-yellow-500">GitHub: </span>
              <Link href="https://github.com/siamliam12">
                https://github.com/siamliam12
              </Link>
            </h6>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-4">
            <p className="font-mono text-base text-gray-700">
              Whether you're a tech enthusiast, a curious beginner, or just
              someone looking to stay updated on the ever-evolving world of
              computer science, this podcast has something for everyone. We dive
              into the latest trends, breakthrough technologies, and best
              practices shaping the future, all while breaking down complex
              topics into easy-to-understand insights. From discussions on the
              hottest tech innovations to tips on navigating the digital
              landscape, we bring you engaging conversations that keep you
              informed, empowered, and ready for whatever comes next in the tech
              world. Tune in for a fresh perspective on tech, trends, and
              everything in between!
            </p>
          </div>
        </div>

        <div className="prose max-w-none pb-4" />
      </div>
    </div>
  );
}

export default Contact;
