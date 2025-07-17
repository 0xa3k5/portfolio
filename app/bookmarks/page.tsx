import { Bookmarks } from "@/src/types";
import NotionService from "@/src/pages/api/notion";
import { SectionTitle } from "@/src/components/section-title";
import Link from "next/link";
import Image from "next/image";

export default async function BookmarksPage() {
  const notionService = new NotionService();
  const bookmarks = await notionService.getBookmarks();

  const bookmarksWithFavicons = await Promise.all(
    bookmarks.map(async (bookmark) => {
      const favicon = await fetchFavicon(bookmark.url);
      return { ...bookmark, favicon };
    })
  );

  const tools = bookmarksWithFavicons.filter((c) => c.isTool === true);
  const regularBookmarks = bookmarksWithFavicons.filter(
    (c) => c.isTool === false
  );

  return (
    <div className="flex flex-col gap-24 pt-8 my-40">
      <div
        data-orientation="horizontal"
        className="flex gap-4 w-full max-w-5xl px-8 mx-auto flex-row relative"
      >
        <SectionTitle
          title="bookmarks"
          subtext="websites that I like or people that inspire me."
          orientation="horizontal"
        />
        <div className="grid w-full grid-cols-1 gap-x-12 sm:grid-cols-2">
          {regularBookmarks.map((bookmark, i) => (
            <BookmarkItem key={i} bookmark={bookmark} />
          ))}
        </div>
      </div>
      <div
        data-orientation="horizontal"
        className="flex gap-4 w-full max-w-5xl px-8 mx-auto flex-row relative"
      >
        <SectionTitle title="stack" orientation="horizontal" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
          {tools.map((tool, i) => (
            <ToolItem key={i} bookmark={tool} />
          ))}
        </div>
      </div>
    </div>
  );
}

async function fetchFavicon(url: string): Promise<string> {
  try {
    const domain = new URL(url).hostname;
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;

    const response = await fetch(faviconUrl);
    if (response.ok) {
      return faviconUrl;
    }
    return "";
  } catch (error) {
    console.error("Error fetching favicon:", error);
    return "";
  }
}

const BookmarkItem = ({ bookmark }: { bookmark: Bookmarks }) => {
  return (
    <Link
      href={bookmark.url}
      className={`
        flex items-center justify-between gap-8 px-4 py-6 duration-150
        border-b border-foam/10 bg-foam/0 hover:bg-foam/5
        `}
    >
      <span className="flex items-center gap-4">
        {bookmark.favicon ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bookmark.favicon}
            alt={`${bookmark.name} Website Favicon`}
            className="h-8 w-8"
          />
        ) : (
          <span
            className={`
                flex h-8 w-8 items-center justify-center rounded-lg bg-opacity-10 text-xl
                bg-foam/10
                `}
          >
            {bookmark.name.slice(0, 1)}
          </span>
        )}

        <span className="flex flex-col">
          <span className="w-64 truncate">{bookmark.name}</span>
          <span className="w-64 truncate text-sm opacity-40">
            {bookmark.url.replace(/^(https?:\/\/)?(www\.)?/i, "")}
          </span>
        </span>
      </span>
    </Link>
  );
};

const ToolItem = ({ bookmark }: { bookmark: Bookmarks }) => {
  return (
    <Link
      href={bookmark.url}
      className={`
        flex items-center justify-between gap-8 px-4 py-6 duration-150
        border-b border-foam/10 bg-foam/0 hover:bg-foam/5
        `}
    >
      <span className="flex items-start gap-6 md:flex-col">
        <span className="flex items-center gap-4">
          {bookmark.favicon ? (
            <Image
              src={bookmark.favicon}
              alt={`${bookmark.name} Website Favicon`}
              width={24}
              height={24}
            />
          ) : (
            <span className="flex h-10 w-10 items-center justify-center rounded-lg text-xl bg-foam/10">
              {bookmark.name.slice(0, 1)}
            </span>
          )}
        </span>
        <span className="flex flex-col gap-1">
          <span>{bookmark.name}</span>
          <span className="text-sm opacity-40">
            {bookmark.url.replace(/^(https?:\/\/)?(www\.)?/i, "")}
          </span>
          <span className="mt-2 text-sm opacity-40">
            {bookmark.tags.join(", ")}
          </span>
        </span>
      </span>
    </Link>
  );
};
