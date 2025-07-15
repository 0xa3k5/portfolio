
import { StaticPage, Bookmarks } from "@/types/types";
import NotionService from "../../pages/api/notion";
import Layout from "@/components/Layout";
import PageHead from "@/components/PageHead";
import MainWrapper from "@/components/MainWrapper";
import SectionTitle from "@/components/SectionTitle";
import { BookmarkItem, ToolItem } from "@/components/BookmarkItem";
import { useEffect, useState } from "react";
import SectionsWrapper from "@/components/SectionsWrapper";

export default function BookmarksPage() {
  const [content, setContent] = useState<Bookmarks[]>([]);
  const [page, setPage] = useState<StaticPage | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const tools = content.filter((c) => c.isTool === true);
  const bookmarks = content.filter((c) => c.isTool === false);

  useEffect(() => {
    const fetchData = async () => {
      const notionService = new NotionService();
      const fetchedPage = (await notionService.getStaticPage()).find(
        (data) => data.name === "Bookmarks"
      );
      const fetchedBookmarks = await notionService.getBookmarks();

      setPage(fetchedPage || null);
      setContent(fetchedBookmarks);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchFavicons = async () => {
      try {
        const updatedBookmarks = await Promise.all(
          content.map(async (bookmark) => {
            const favicon = await fetchFavicon(bookmark.url);
            return { ...bookmark, favicon };
          })
        );
        setContent(updatedBookmarks);
      } catch (error) {
        console.error("Error fetching favicons:", error);
      }
    };

    if (content.length > 0) {
      fetchFavicons();
    }
  }, [content]);

  if (isLoading || !page) {
    return <div>Loading...</div>;
  }

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

export async function generateMetadata() {
  const notionService = new NotionService();
  const page = (await notionService.getStaticPage()).find(
    (data) => data.name === "Bookmarks"
  );

  return {
    title: page?.title || "Bookmarks",
    description: page?.description || "Bookmarks and tools",
  };
}
