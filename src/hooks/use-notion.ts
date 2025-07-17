import { useEffect, useState } from "react";
import {
  Bookmarks,
  Collaborator,
  Exploration,
  Feedback,
  Idea,
  NotionPost,
  SideProject,
  StaticPage,
  WorkExp,
} from "../types";
import { MdStringObject } from "notion-to-md/build/types";

export const useNotion = () => {
  const [notionData, setNotionData] = useState<{
    page: StaticPage[];
    posts: NotionPost[];
    sideProjects: SideProject[];
    feedbacks: Feedback[];
    explorations: Exploration[];
    collaborators: Collaborator[];
    workExp: WorkExp[];
    ideas: {
      posts: Idea[];
      md: {
        [key: string]: { markdown: MdStringObject };
      };
    };
    bookmarks: Bookmarks[];
  }>({
    page: [],
    posts: [],
    sideProjects: [],
    feedbacks: [],
    explorations: [],
    collaborators: [],
    workExp: [],
    ideas: {
      posts: [],
      md: {},
    },
    bookmarks: [],
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/notion-data");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setNotionData(data);
      } catch (error) {
        console.error("Error fetching Notion data:", error);
      }
    })();
  }, []);

  return {
    page: notionData.page,
    posts: notionData.posts,
    sideProjects: notionData.sideProjects,
    feedbacks: notionData.feedbacks,
    explorations: notionData.explorations,
    collaborators: notionData.collaborators,
    workExp: notionData.workExp,
    ideas: notionData.ideas,
    bookmarks: notionData.bookmarks,
  };
};
