import { Dispatch, SetStateAction } from "react";
import { NotionPost } from "../../@types/schema";
import ContentCard from "../components/Cards/ContentCard";
import SectionTitle from "../components/SectionTitle";
import Image from "next/image";
import SectionsWrapper from "./SectionsWrapper";

interface PostsProps {
  className?: string;
  title: string;
  posts: NotionPost[];
  state: {
    hovered: NotionPost;
    setHovered: Dispatch<SetStateAction<NotionPost>>;
  };
}

export default function Posts({
  className,
  title,
  posts,
  state,
}: PostsProps): JSX.Element {
  return (
    <SectionsWrapper className={className}>
      <SectionTitle title={title} className="mb-16" />
      <div className="flex items-center gap-4">
        <div className="flex w-full flex-col gap-8 md:gap-12 lg:w-1/2 lg:pr-12">
          {posts
            .sort(
              (a: NotionPost, b: NotionPost) =>
                a.properties.number - b.properties.number
            )
            .map((p: NotionPost) => {
              return (
                <ContentCard.Compact
                  post={p}
                  key={p.properties.id}
                  onMouseEnter={() => state.setHovered(p)}
                  onMouseLeave={() => state.setHovered(null)}
                />
              );
            })}
        </div>
        <div className="relative hidden h-[40rem] flex-1 lg:inline-block">
          {state.hovered && (
            <Image
              src={state.hovered.details.img}
              alt={state.hovered.details.title}
              fill
              style={{
                objectFit: "contain",
                objectPosition: "center",
                maxWidth: "100%",
              }}
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            />
          )}
        </div>
      </div>
    </SectionsWrapper>
  );
}
