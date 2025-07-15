import { GetStaticProps } from "next";
import { StaticPage, Bookmarks } from "../src/types";
import NotionService from "./api/notion";
import Layout from "../src/components/Layout";
import PageHead from "../src/components/PageHead";
import MainWrapper from "../src/components/MainWrapper";

import SectionTitle from "../src/components/SectionTitle";
import { BookmarkItem, ToolItem } from "../src/components/BookmarkItem";
import { useEffect, useState } from "react";
import SectionsWrapper from "../src/components/SectionsWrapper";

interface BookmarksProps {
  page: StaticPage;
  _bookmarks: Bookmarks[];
}

export default function BookmarksPage({ page, _bookmarks }: BookmarksProps) {
  const [content, setContent] = useState<Bookmarks[]>(_bookmarks);
  const tools = content.filter((c) => c.isTool === true);
  const bookmarks = content.filter((c) => c.isTool === false);

  useEffect(() => {
    const fetchFavicons = async () => {
      try {
        const updatedBookmarks = await Promise.all(
          _bookmarks.map(async (bookmark) => {
            const favicon = await fetchFavicon(bookmark.url);
            return { ...bookmark, favicon };
          })
        );
        setContent(updatedBookmarks);
      } catch (error) {
        console.error("Error fetching favicons:", error);
      }
    };

    fetchFavicons();
  }, [_bookmarks]);

  const fetchFavicon = async (url: string) => {
    try {
      const response = await fetch(`/api/favicon?url=${url}`);
      const data = await response.json();
      return data.favicon;
    } catch (error) {
      console.error("Error fetching favicon:", error);
      return "";
    }
  };

  return (
    <Layout hideCTA>
      <PageHead page={page} />
      <MainWrapper>
        <SectionsWrapper row className="relative">
          <SectionTitle
            row
            title="bookmarks"
            subtext="websites that I like or people that inspire me."
          />
          <div className="grid w-full grid-cols-1 gap-x-12 sm:grid-cols-2">
            {bookmarks.map((bookmark, i) => (
              <BookmarkItem key={i} bookmark={bookmark} />
            ))}
          </div>
        </SectionsWrapper>
        <SectionsWrapper row>
          <SectionTitle row title="stack" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
            {tools.map((tool, i) => (
              <ToolItem key={i} bookmark={tool} />
            ))}
          </div>
        </SectionsWrapper>
      </MainWrapper>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService();

  const page = (await notionService.getStaticPage()).find(
    (data) => data.name === "Bookmarks"
  );

  const _bookmarks = await notionService.getBookmarks();

  return {
    props: {
      page,
      _bookmarks,
    },
  };
};
