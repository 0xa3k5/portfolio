"use client";
import Image from "next/image";
import { Rectangle, Code, SideProjects, Crypto } from "./";
import Button from "@/src/components/button";
import { CopyIcon, GithubIcon, LinkedinIcon } from "@/src/components/icons";

export const Hero = () => {
  return (
    <div className="flex w-full max-w-5xl flex-col gap-8 px-4 py-8 md:py-16 mx-auto !font-sans">
      <div className="flex items-center gap-4">
        <div className="relative flex aspect-square w-14 shrink-0 overflow-clip rounded-xl">
          <Image
            src={"/ak.png"}
            alt="AK – Product Designer"
            width={512}
            height={512}
            priority
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-lg">AK</span>
          <span className="opacity-60">Product Designer</span>
        </div>
      </div>

      <h1 className="flex flex-wrap gap-2 text-4xl font-bold sm:gap-4 sm:text-5xl">
        <span className="">{"I draw "}</span>
        <Rectangle />
        <span className="">{"– write "}</span>
        <Code />
        <span className="">{"– build "}</span>
        <SideProjects />
        <span className="">{"– trade "}</span>
        <Crypto />
      </h1>
      <div className="flex gap-2">
        <Button variant="primary" onClick={() => {}}>
          <CopyIcon className="size-4" />
          <span>{"hey@akml.io"}</span>
        </Button>
        <Button
          variant="secondary"
          href="https://github.com/0xa3k5"
          target="_blank"
        >
          <GithubIcon className="size-5" />
        </Button>
        <Button
          variant="secondary"
          href="https://linkedin.com/in/alikemalakcay"
          target="_blank"
        >
          <LinkedinIcon className="size-5" />
        </Button>
      </div>
    </div>
  );
};
